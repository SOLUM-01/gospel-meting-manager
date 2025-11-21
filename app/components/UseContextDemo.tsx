'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

/**
 * useContext 훅 실습 컴포넌트
 * - Context 생성 및 제공
 * - 깊은 컴포넌트 트리에서 데이터 공유
 * - Props Drilling 해결
 */

// 테마 타입 정의
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 사용자 타입 정의
interface User {
  name: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  login: (name: string, role: string) => void;
  logout: () => void;
}

// Context 생성
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const UserContext = createContext<UserContextType | undefined>(undefined);

// 커스텀 훅
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// Provider 컴포넌트들
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string, role: string) => {
    setUser({ name, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// 깊은 중첩 컴포넌트들
function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();

  return (
    <div
      className={`p-4 rounded-lg ${
        theme === 'light' ? 'bg-blue-100' : 'bg-gray-800'
      }`}
    >
      <div className="flex justify-between items-center">
        <h3
          className={`text-lg font-bold ${
            theme === 'light' ? 'text-blue-800' : 'text-white'
          }`}
        >
          헤더 컴포넌트
        </h3>
        <div className="flex gap-2">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            {theme === 'light' ? '🌙 다크' : '☀️ 라이트'}
          </button>
          {user && (
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  const { theme } = useTheme();
  const { user } = useUser();

  return (
    <div
      className={`p-4 rounded-lg ${
        theme === 'light' ? 'bg-green-100' : 'bg-gray-700'
      }`}
    >
      <h4
        className={`font-semibold mb-2 ${
          theme === 'light' ? 'text-green-800' : 'text-white'
        }`}
      >
        사이드바
      </h4>
      <p
        className={`text-sm ${
          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
        }`}
      >
        현재 테마: <strong>{theme}</strong>
      </p>
      {user && (
        <p
          className={`text-sm ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}
        >
          사용자: <strong>{user.name}</strong>
        </p>
      )}
    </div>
  );
}

function Content() {
  const { theme } = useTheme();
  const { user } = useUser();

  return (
    <div
      className={`p-4 rounded-lg ${
        theme === 'light' ? 'bg-yellow-100' : 'bg-gray-600'
      }`}
    >
      <h4
        className={`font-semibold mb-2 ${
          theme === 'light' ? 'text-yellow-800' : 'text-white'
        }`}
      >
        컨텐츠 영역
      </h4>
      {user ? (
        <div
          className={`p-3 rounded ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}
        >
          <p
            className={`font-semibold ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            }`}
          >
            환영합니다, {user.name}님!
          </p>
          <p
            className={`text-sm ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            역할: {user.role}
          </p>
        </div>
      ) : (
        <p
          className={`text-sm ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}
        >
          로그인해주세요.
        </p>
      )}
    </div>
  );
}

function Footer() {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 rounded-lg text-center ${
        theme === 'light' ? 'bg-purple-100' : 'bg-gray-800'
      }`}
    >
      <p
        className={`text-sm ${
          theme === 'light' ? 'text-purple-800' : 'text-gray-300'
        }`}
      >
        푸터 컴포넌트 - Context를 통해 테마 적용됨
      </p>
    </div>
  );
}

// 레이아웃 컴포넌트
function Layout() {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 rounded-lg ${
        theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'
      }`}
    >
      <div className="space-y-4">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Sidebar />
          <div className="md:col-span-2">
            <Content />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

// 로그인 폼
function LoginForm() {
  const { login } = useUser();
  const [name, setName] = useState('');
  const [role, setRole] = useState('사용자');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name, role);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold mb-3">로그인</h4>
      <div className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          className="px-3 py-2 border rounded w-full"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-3 py-2 border rounded w-full"
        >
          <option value="사용자">사용자</option>
          <option value="관리자">관리자</option>
          <option value="게스트">게스트</option>
        </select>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          로그인
        </button>
      </div>
    </form>
  );
}

// 메인 컴포넌트
export default function UseContextDemo() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🎣 useContext 훅 실습
      </h2>

      <div className="space-y-6">
        {/* 설명 */}
        <section className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-blue-800">
            Context란?
          </h3>
          <p className="text-sm text-gray-700 mb-2">
            Context는 컴포넌트 트리 전체에 데이터를 제공하는 방법입니다. Props를
            여러 단계 거쳐 전달하지 않고도 필요한 컴포넌트에서 직접 데이터를
            사용할 수 있습니다.
          </p>
          <p className="text-sm text-gray-700">
            💡 <strong>Props Drilling 문제 해결:</strong> 깊은 컴포넌트 트리에서
            props를 계속 전달할 필요가 없습니다.
          </p>
        </section>

        {/* Context Provider로 감싸기 */}
        <ThemeProvider>
          <UserProvider>
            <div className="space-y-4">
              {/* 로그인 폼 */}
              <LoginForm />

              {/* 레이아웃 (모든 하위 컴포넌트가 Context 사용) */}
              <Layout />

              {/* 정보 */}
              <section className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  🎯 실습 내용
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✅ 테마 버튼을 눌러 라이트/다크 모드를 전환해보세요</li>
                  <li>✅ 로그인하면 모든 컴포넌트에서 사용자 정보를 볼 수 있습니다</li>
                  <li>✅ Props를 전달하지 않아도 깊은 컴포넌트에서 데이터에 접근 가능합니다</li>
                  <li>✅ Context 값이 변경되면 사용하는 모든 컴포넌트가 리렌더링됩니다</li>
                </ul>
              </section>

              {/* 핵심 개념 */}
              <section className="p-4 bg-purple-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-purple-800">
                  📚 useContext 핵심 개념
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <strong>createContext:</strong> Context 객체 생성
                  </li>
                  <li>
                    <strong>Provider:</strong> Context 값을 하위 컴포넌트에 제공
                  </li>
                  <li>
                    <strong>useContext:</strong> Context 값을 구독하고 사용
                  </li>
                  <li>
                    <strong>장점:</strong> Props Drilling 해결, 전역 상태 관리
                  </li>
                  <li>
                    <strong>주의:</strong> Context 값 변경 시 모든 구독자가
                    리렌더링됨
                  </li>
                  <li>
                    <strong>사용 사례:</strong> 테마, 언어, 인증 정보 등 전역 데이터
                  </li>
                </ul>
              </section>
            </div>
          </UserProvider>
        </ThemeProvider>
      </div>
    </div>
  );
}

