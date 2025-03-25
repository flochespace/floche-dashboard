// 전체 index.tsx 코드 (Next.js용)
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!userId.trim()) {
      setError("아이디를 입력하세요.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `https://script.google.com/macros/s/AKfycbyW7xUruIOS_6bSJ9woOAJPm99KobDLaP2Itc3ZyJuupO1EUJyi0Tqg14Anc6CvfbpP/exec?id=${userId}`
      );

      const data = await res.json();

      if (data.length > 0) {
        setResult(data[0]);
      } else {
        setError("해당 아이디의 데이터를 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFetch();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>
          플로체스페이스<br />
          <span style={{ fontWeight: "normal" }}>수락율 조회</span>
        </h2>

        <input
          type="text"
          placeholder="아이디 입력"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />

        <button onClick={handleFetch} disabled={loading} style={styles.button}>
          {loading ? "조회 중..." : "확인"}
        </button>

        <div style={{ marginTop: 16 }}>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          {result && (
            <div style={styles.card}>
              <p><strong>아이디:</strong> {result[0]}</p>
              <p><strong>이름:</strong> {result[1]}</p>
              <p><strong>완료:</strong> {result[2]} 건</p>
              <p><strong>거절:</strong> {result[3]} 건</p>
              <p><strong>배차취소:</strong> {result[4]} 건</p>
              <p><strong>귀책취소:</strong> {result[5]} 건</p>
              <p><strong>수락율:</strong> {result[6]}</p>
              <p><strong>업데이트일:</strong> {result[7]}</p>
              <p><strong>등급:</strong> {result[8]}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: "#f2f2f2",
    minHeight: "100vh",
    padding: 20,
    fontFamily: "Apple SD Gothic Neo, Noto Sans KR, sans-serif",
  },
  container: {
    maxWidth: 400,
    margin: "auto",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 20,
    lineHeight: 1.5,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
    border: "1px solid #ccc",
    marginBottom: 12,
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
    border: "none",
    backgroundColor: "#4f46e5",
    color: "white",
    cursor: "pointer",
  },
  card: {
    background: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    animation: "fadeIn 0.4s ease",
    fontSize: 15,
    lineHeight: 1.6,
  },
};
