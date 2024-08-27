//Join_eff<- 유효성이 영어로 effectiveness

import { checkid } from "./ApiService";

// Join_eff.js
export const validateJoin = (data) => {
    let errors = {};

    // 이름 유효성 검사
    if (!data.name) {
        errors.name = "이름을 입력해 주세요.";
    }

    // 생년월일 유효성 검사
    if (!data.birthday || data.birthday.length !== 8 || isNaN(data.birthday)) {
        errors.birthday = "유효한 생년월일을 입력해 주세요.";
    }

    // 핸드폰 번호 유효성 검사
    if (!data.tel || data.tel.length > 13 || isNaN(data.tel)) {
        errors.tel = "유효한 핸드폰 번호를 입력해 주세요.";
    }

    // 아이디 유효성 검사 (이메일 형식)
    if (!data.id || !/\S+@\S+\.\S+/.test(data.id)) {
        errors.id = "유효한 이메일을 입력해 주세요.";
    }
    // 비밀번호 유효성 검사
    if (!data.pw || data.pw.length < 8 || !/[A-Z]/.test(data.pw) || !/[a-z]/.test(data.pw) || !/[0-9]/.test(data.pw) || !/[\W_]/.test(data.pw)) {
        errors.pw = "비밀번호는 최소 8자 이상, 대소문자, 숫자 및 특수문자를 포함해야 합니다.";
    }

    // 비밀번호 재입력 유효성 검사
    if (data.pw !== data.passwordConfirm) {
        errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    // 약관 동의 유효성 검사
    if (!data.agree) {
        errors.agree = "회원가입 약관에 동의해 주세요.";
    }



    return errors;
};
