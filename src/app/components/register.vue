<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-7 col-xl-7 mx-auto">
        <div class="card card-signin flex-row my-3">
          <div class="card-img-left d-none d-md-flex">
            <!-- Background image for card set in CSS! -->
          </div>
          <div class="card-body">
            <h5 class="card-title text-center">Register</h5>
            <form action='/user/register' method='post' class="form-signin">
              <div class="form-label-group">
                <input
                  type="text"
                  id="inputUserame"
                  name="username"
                  class="form-control"
                  placeholder="Username"
                  required
                  autofocus
                />
                <label for="inputUserame">Username</label>
              </div>

              <div class="form-label-group">
                <input
                  type="email"
                  id="inputEmail"
                  name="email"
                  class="form-control"
                  placeholder="Email address"
                  required
                />
                <label for="inputEmail">Email address</label>
              </div>

              <hr />

              <div class="form-label-group">
                <input
                  type="password"
                  id="inputPassword"
                  name="password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
                <label for="inputPassword">Password</label>
              </div>

              <div class="form-label-group">
                <input
                  type="password"
                  id="inputConfirmPassword"
                  name="rpassword"
                  class="form-control"
                  placeholder="Password"
                  required
                />
                <label for="inputConfirmPassword">Confirm password</label>
              </div>

              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
              <a class="d-block text-center mt-2 small" href="#">Sign In</a>
              <hr class="my-4" />
              <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit">
                <i class="fab fa-google mr-2"></i> Sign up with Google
              </button>
              <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit">
                <i class="fab fa-facebook-f mr-2"></i> Sign up with Facebook
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: "",
        pass: ""
      }
    };
  }
};
</script>

<style scoped>
  .card-signin {
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .card-signin .card-title {
    margin-bottom: 1rem;
    font-weight: 300;
    font-size: 1.5rem;
  }

  .card-signin .card-img-left {
    width: 45%;
    /* Link to your background image using in the property below! */
    background: scroll center
      url("/app/img/login-card-img.jpg");
    background-size: cover;
  }

  .card-signin .card-body {
    padding: 1rem;
  }

  .form-signin {
    width: 100%;
  }

  .form-signin .btn {
    font-size: 80%;
    border-radius: 5rem;
    letter-spacing: 0.1rem;
    font-weight: bold;
    padding: .6rem;
    transition: all 0.2s;
  }

  .form-label-group {
    position: relative;
    margin-bottom: .6rem;
  }

  .form-label-group input {
    height: auto;
    border-radius: 2rem;
  }

  .form-label-group > input,
  .form-label-group > label {
    padding: var(--input-padding-y) var(--input-padding-x);
  }

  .form-label-group > label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    /* Override default `<label>` margin */
    line-height: 1.5;
    color: #495057;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
  }

  .form-label-group input::-webkit-input-placeholder {
    color: transparent;
  }

  .form-label-group input:-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-moz-placeholder {
    color: transparent;
  }

  .form-label-group input::placeholder {
    color: transparent;
  }

  .form-label-group input:not(:placeholder-shown) {
    padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
    padding-bottom: calc(var(--input-padding-y) / 3);
  }

  .form-label-group input:not(:placeholder-shown) ~ label {
    padding-top: calc(var(--input-padding-y) / 3);
    padding-bottom: calc(var(--input-padding-y) / 3);
    font-size: 10px;
    color: #777;
  }

  .btn-google {
    color: white;
    background-color: #ea4335;
  }

  .btn-facebook {
    color: white;
    background-color: #3b5998;
  }
</style>


