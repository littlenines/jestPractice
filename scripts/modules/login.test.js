import {loginData} from './login'
describe('Login',() => {

    beforeEach(() => {
        window.sessionStorage.clear();

        document.body.innerHTML = `
        <div class="login-wrapper">
        <form class="login">
            <p class="login-title">Login</p>
            <div class="input-wrapper">
                <input class="form-user-input" type="text" name="name" data-username data-change required>
                <label class="login-placeholder" for="name">
                    <span>Username&nbsp;*</span>
                </label>
            </div>
            
            <div class="input-wrapper">
                <input class="form-user-input" type="password" name="password" data-password data-change required>
                <label class="login-placeholder" for="name">
                    <span>Password&nbsp;*</span>
                </label>
            </div>
            
            <p class="error-message" data-error-message>*Wrong username or password</p>
            <button type="submit" class="login-button button disabled" data-login disabled>Submit</button>
        </form>
    </div>`;
    })
    
    test('should button lose disabled ',async () => {
        await loginData();
        const firstInput = document.querySelector('[data-username]');
        const secondInput = document.querySelector('[data-password]');
        const loginButton = document.querySelector('[data-login]');
        const inputEvent = new Event('input');
        firstInput.value = 'nemanja';
        firstInput.dispatchEvent(inputEvent);
        secondInput.value = 'zxc';
        secondInput.dispatchEvent(inputEvent);

        expect(loginButton.getAttribute('disabled')).toBeNull();
    })

    test('should token exist', async () => {
        await loginData();
        const firstInput = document.querySelector('[data-username]');
        const secondInput = document.querySelector('[data-password]');
        const loginButton = document.querySelector('[data-login]');
        const inputEvent = new Event('input');
        firstInput.value = 'nemanja';
        firstInput.dispatchEvent(inputEvent);
        secondInput.value = 'zxc';
        secondInput.dispatchEvent(inputEvent);

        loginButton.click();
        expect(window.sessionStorage.getItem('token')).not.toBeNull();
    })
})