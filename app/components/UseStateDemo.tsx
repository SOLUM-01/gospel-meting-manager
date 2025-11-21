'use client';

import { useState } from 'react';

/**
 * useState 훅 실습 컴포넌트
 * - 기본 타입 상태 관리
 * - 객체 상태 관리
 * - 배열 상태 관리
 * - 이전 상태 기반 업데이트
 */

interface User {
  name: string;
  email: string;
  age: number;
}

export default function UseStateDemo() {
  // 1. 기본 타입 상태
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState('');
  const [isToggled, setIsToggled] = useState(false);

  // 2. 객체 상태
  const [user, setUser] = useState<User>({
    name: '홍길동',
    email: 'hong@example.com',
    age: 30,
  });

  // 3. 배열 상태
  const [todos, setTodos] = useState<string[]>([
    '리액트 공부하기',
    '프로젝트 만들기',
  ]);
  const [newTodo, setNewTodo] = useState('');

  // 4. 함수형 업데이트
  const incrementMultiple = () => {
    // 잘못된 방법 (마지막 값만 적용됨)
    // setCounter(counter + 1);
    // setCounter(counter + 1);
    // setCounter(counter + 1);

    // 올바른 방법 (이전 상태 기반)
    setCounter((prev) => prev + 1);
    setCounter((prev) => prev + 1);
    setCounter((prev) => prev + 1);
  };

  // 객체 업데이트 핸들러
  const updateUserName = (name: string) => {
    setUser((prev) => ({ ...prev, name }));
  };

  const updateUserEmail = (email: string) => {
    setUser((prev) => ({ ...prev, email }));
  };

  const updateUserAge = (age: number) => {
    setUser((prev) => ({ ...prev, age }));
  };

  // 배열 업데이트 핸들러
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos((prev) => [...prev, newTodo]);
      setNewTodo('');
    }
  };

  const removeTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllTodos = () => {
    setTodos([]);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🎣 useState 훅 실습
      </h2>

      <div className="space-y-6">
        {/* 기본 타입 상태 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            1. 기본 타입 상태 관리
          </h3>

          {/* 숫자 */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">숫자 (Number)</h4>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCounter(counter - 1)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                -1
              </button>
              <span className="text-xl font-bold">{counter}</span>
              <button
                onClick={() => setCounter(counter + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +1
              </button>
              <button
                onClick={incrementMultiple}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                +3 (함수형)
              </button>
              <button
                onClick={() => setCounter(0)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                초기화
              </button>
            </div>
          </div>

          {/* 문자열 */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">문자열 (String)</h4>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="텍스트 입력"
              className="px-4 py-2 border border-gray-300 rounded w-full mb-2"
            />
            <p className="text-gray-700">
              입력값: <strong>{text || '(없음)'}</strong>
            </p>
          </div>

          {/* 불린 */}
          <div>
            <h4 className="font-semibold mb-2">불린 (Boolean)</h4>
            <button
              onClick={() => setIsToggled(!isToggled)}
              className={`px-4 py-2 rounded text-white ${
                isToggled ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
              }`}
            >
              {isToggled ? 'ON ✓' : 'OFF ✗'}
            </button>
          </div>
        </section>

        {/* 객체 상태 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            2. 객체 상태 관리
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">이름</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => updateUserName(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">이메일</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => updateUserEmail(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">나이</label>
              <input
                type="number"
                value={user.age}
                onChange={(e) => updateUserAge(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="p-3 bg-blue-100 rounded">
              <h4 className="font-semibold mb-2">현재 사용자 정보:</h4>
              <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
            </div>
          </div>
        </section>

        {/* 배열 상태 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            3. 배열 상태 관리
          </h3>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="할 일 추가"
              className="px-4 py-2 border border-gray-300 rounded flex-1"
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              추가
            </button>
            <button
              onClick={clearAllTodos}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              전체 삭제
            </button>
          </div>
          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                할 일이 없습니다. 추가해보세요!
              </p>
            ) : (
              todos.map((todo, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-white rounded border"
                >
                  <span>
                    {index + 1}. {todo}
                  </span>
                  <button
                    onClick={() => removeTodo(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    삭제
                  </button>
                </div>
              ))
            )}
          </div>
          <p className="mt-3 text-sm text-gray-600">
            총 {todos.length}개의 할 일
          </p>
        </section>
      </div>
    </div>
  );
}

