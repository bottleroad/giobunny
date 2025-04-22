import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * 이메일 발송 함수
 * 
 * 참고: Google 계정을 사용할 경우 다음과 같은 인증 방법이 있습니다:
 * 1. 앱 비밀번호 사용 (2단계 인증이 활성화된 경우 필요)
 *    - Google 계정 설정에서 앱 비밀번호를 생성: https://myaccount.google.com/apppasswords
 *    - .env.local 파일에 앱 비밀번호를 설정
 * 
 * 2. 보안 수준이 낮은 앱 허용 (비권장)
 *    - https://myaccount.google.com/lesssecureapps 에서 설정
 *    - 이 방법은 보안상 권장되지 않습니다.
 */
async function sendEmail(data: {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  senderName?: string;
}) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error('이메일 설정이 잘못되었습니다. 환경 변수를 확인해주세요.');
  }

  // Gmail SMTP 설정
  // 주의: 534-5.7.9 오류는 Google 계정이 2단계 인증을 사용할 때 발생합니다.
  // 이 경우 일반 비밀번호가 아닌 앱 비밀번호를 사용해야 합니다.
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true=465 포트, false=다른 포트
    auth: {
      user, // Gmail 계정
      pass, // 앱 비밀번호 (일반 비밀번호 X)
    },
    // 디버깅 활성화 (오류 발생 시 추가 정보 제공)
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development',
  });

  try {
    // 이메일 전송 전 연결 확인
    await transporter.verify();
    
    // 이메일 발송
    const info = await transporter.sendMail({
      from: data.senderName ? `"${data.senderName}" <${user}>` : `"제주한달살기" <${user}>`,
      to: data.to,
      subject: data.subject,
      html: data.html,
      replyTo: data.replyTo, // 답장시 사용자 이메일로 회신되도록 설정
    });

    console.log('이메일 발송 완료:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('이메일 발송 실패:', error);
    
    // 오류 원인을 구체적으로 확인
    if (error instanceof Error) {
      // Google 인증 관련 오류인 경우
      if (error.message.includes('Application-specific password required')) {
        console.error('Google 앱 비밀번호가 필요합니다. .env.local 파일의 EMAIL_PASS를 앱 비밀번호로 수정하세요.');
        throw new Error('Google 인증 설정이 필요합니다. 앱 비밀번호를 설정해주세요.');
      }
    }
    
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // 필수 필드 검증
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { success: false, message: '이름, 이메일, 문의내용은 필수 입력사항입니다.' },
        { status: 400 }
      );
    }
    
    // 이메일 데이터 구성
    const emailData = {
      to: 'bottleroad@gmail.com', // 담당자 이메일
      subject: `제주한달살기 문의: ${formData.name}님`,
      senderName: formData.name, // 사용자 이름
      replyTo: formData.email, // 사용자 이메일
      html: `
        <h1>제주한달살기 웹사이트 문의</h1>
        <p><strong>이름:</strong> ${formData.name}</p>
        <p><strong>이메일:</strong> ${formData.email}</p>
        <p><strong>연락처:</strong> ${formData.phone || '미입력'}</p>
        <p><strong>문의내용:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
        <hr />
        <p>발신일시: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
      `,
    };

    // 이메일 발송
    const result = await sendEmail(emailData);
    
    return NextResponse.json({ 
      success: true, 
      message: '문의가 성공적으로 접수되었습니다.',
      info: result
    });
    
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    let errorMessage = '문의 접수 중 오류가 발생했습니다.';
    
    // 사용자에게 도움이 될 수 있는 구체적인 오류 메시지 제공
    if (error instanceof Error) {
      if (error.message.includes('앱 비밀번호')) {
        errorMessage = 'Google 인증 설정이 필요합니다. 관리자에게 문의하세요.';
      } else if (error.message.includes('EAUTH')) {
        errorMessage = '이메일 인증에 실패했습니다. 관리자에게 문의하세요.';
      } else if (error.message.includes('SMTP')) {
        errorMessage = '이메일 서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
} 