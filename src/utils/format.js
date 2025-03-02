// 전화번호 자동 포맷팅 
export const formatPhoneNumber = (value) => {
  value = value.replace(/[^0-9]/g, ''); // 숫자만 남기기

  if (value.length >= 11) {
    value = value.slice(0, 11);
  }

  if (value.length >= 4 && value.length <= 7) {
    value = `${value.slice(0, 3)}-${value.slice(3)}`;
  } else if (value.length >= 8) {
    value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
  }

  return value;
};
