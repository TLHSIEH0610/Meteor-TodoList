import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };

  return (
    <form className="loginForm" onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">UserName</label>
        <input
          type="text"
          placeholder="back2dev"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="back2dev"
          name="password"
          autoComplete="off"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
