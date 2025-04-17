import {useState, useEffect} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<string>("로딩 중...");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [postResult, setPostResult] = useState<string>("");
  const [users, setUsers] = useState<Array<{name: string; email: string}>>([]);

  const handlePost = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email}),
      });

      const data = await response.json();
      setPostResult(`등록 완료: ${data.name} (${data.email})`);
      const updatedUsers = await fetch("/api/users").then((res) => res.json());
      setUsers(updatedUsers);
    } catch (error) {
      setPostResult("POST 실패");
    }
  };

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.text())
      .then(setMessage)
      .catch(() => setMessage("API 호출 실패"));
  }, []);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(() => console.error("유저 목록 불러오기 실패"));
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <div style={{textAlign: "center", marginTop: "40px"}}>
        <h1>React + Spring Boot 연결 테스트</h1>
        <p>{message}</p>
      </div>
      <input type="text" name="username" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handlePost}>POST 요청</button>
      <p>{postResult}</p>

      <div style={{marginTop: "20px"}}>
        <h2>등록된 사용자 목록</h2>
        <ul>
          {(Array.isArray(users) ? users : []).map((user, idx) => (
            <li key={idx}>
              이름: {user.name}, 이메일: {user.email}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
