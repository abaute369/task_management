import { CanActivateFn } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  let res = localStorage.getItem('isLogin') === 'true'
  console.log(res)
  if (res) {
    return true;

  }
  return false;
};
