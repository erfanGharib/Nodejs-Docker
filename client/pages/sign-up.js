const signUp_$html = (`
    <div id="form">
    <h1>Sign up</h1>
    <input type="email" id="email" required placeholder="Enter your email..">
    <span class="err"></span>
    <label for="pass">
        <input type="password" style="width:95%;" id="pass" required placeholder="Enter your password..">
        <span id="show-pass">show</span>
    </label>
    <span class="err"></span>
    <button type="submit" id="submit-btn">
        Sign up
    </button>
    </div>
`);
export default signUp_$html;