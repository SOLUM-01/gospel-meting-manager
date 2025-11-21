'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * useRef 훅 실습 컴포넌트
 * - DOM 요소 접근
 * - 리렌더링 없이 값 저장
 * - 이전 값 추적
 * - 포커스 관리
 */

export default function UseRefDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // 1. DOM 요소 참조
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 2. 리렌더링 없이 값 저장
  const renderCount = useRef(0);
  const previousCount = useRef(0);

  // 3. 타이머 ID 저장
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 렌더링 횟수 카운트
  useEffect(() => {
    renderCount.current += 1;
  });

  // 이전 count 값 저장
  useEffect(() => {
    previousCount.current = count;
  }, [count]);

  // 타이머 관리
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // DOM 조작 함수들
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const handleToggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimer(0);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🎣 useRef 훅 실습
      </h2>

      <div className="space-y-6">
        {/* DOM 요소 접근 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            1. DOM 요소 직접 접근
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            useRef를 사용하여 DOM 요소에 직접 접근할 수 있습니다.
          </p>
          <div className="space-y-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="여기에 입력하세요"
              className="px-4 py-2 border border-gray-300 rounded w-full"
            />
            <div className="flex gap-2">
              <button
                onClick={focusInput}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                🎯 포커스
              </button>
              <button
                onClick={clearInput}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                🗑️ 지우기
              </button>
            </div>
          </div>
        </section>

        {/* 리렌더링 없이 값 저장 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            2. 리렌더링 없이 값 저장
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            useRef는 값이 변경되어도 리렌더링을 트리거하지 않습니다.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                카운트 증가
              </button>
              <span className="text-xl font-bold">현재 값: {count}</span>
            </div>
            <div className="p-3 bg-blue-100 rounded space-y-1">
              <p className="text-blue-800">
                <strong>현재 count:</strong> {count}
              </p>
              <p className="text-blue-800">
                <strong>이전 count:</strong> {previousCount.current}
              </p>
              <p className="text-blue-800">
                <strong>총 렌더링 횟수:</strong> {renderCount.current}
              </p>
            </div>
            <p className="text-sm text-gray-600">
              💡 renderCount는 ref로 관리되어 증가해도 리렌더링이 발생하지
              않습니다!
            </p>
          </div>
        </section>

        {/* 타이머 관리 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            3. 타이머 ID 저장 (클린업)
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            useRef로 interval ID를 저장하여 정확하게 클린업할 수 있습니다.
          </p>
          <div className="space-y-3">
            <div className="text-4xl font-bold text-center text-blue-600">
              {String(Math.floor(timer / 60)).padStart(2, '0')}:
              {String(timer % 60).padStart(2, '0')}
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={handleToggleTimer}
                className={`px-4 py-2 rounded text-white ${
                  isRunning
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isRunning ? '⏸️ 일시정지' : '▶️ 시작'}
              </button>
              <button
                onClick={handleResetTimer}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                🔄 리셋
              </button>
            </div>
            <p className="text-sm text-gray-600">
              💡 intervalRef.current에 타이머 ID가 저장됩니다.
            </p>
          </div>
        </section>

        {/* 입력 필드 제어 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            4. 비제어 컴포넌트 패턴
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            useRef를 사용한 비제어 컴포넌트 vs useState를 사용한 제어 컴포넌트
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 비제어 컴포넌트 (useRef) */}
            <div className="p-3 bg-yellow-50 rounded">
              <h4 className="font-semibold mb-2 text-yellow-800">
                비제어 (useRef)
              </h4>
              <input
                ref={inputRef}
                type="text"
                placeholder="리렌더링 없음"
                className="px-3 py-2 border rounded w-full mb-2"
              />
              <button
                onClick={() => {
                  alert(`입력값: ${inputRef.current?.value}`);
                }}
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
              >
                값 확인
              </button>
              <p className="text-xs text-gray-600 mt-2">
                입력해도 리렌더링이 발생하지 않습니다.
              </p>
            </div>

            {/* 제어 컴포넌트 (useState) */}
            <div className="p-3 bg-green-50 rounded">
              <h4 className="font-semibold mb-2 text-green-800">
                제어 (useState)
              </h4>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="리렌더링 발생"
                className="px-3 py-2 border rounded w-full mb-2"
              />
              <p className="text-sm">
                <strong>현재 값:</strong> {name || '(없음)'}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                입력할 때마다 리렌더링됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* 핵심 개념 정리 */}
        <section className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-purple-800">
            📚 useRef 핵심 개념
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <strong>DOM 접근:</strong> inputRef.current로 실제 DOM 요소에
              접근
            </li>
            <li>
              <strong>리렌더링 없음:</strong> .current 값이 변경되어도
              리렌더링 없음
            </li>
            <li>
              <strong>값 유지:</strong> 리렌더링 사이에 값이 유지됨
            </li>
            <li>
              <strong>변경 가능:</strong> .current는 언제든 변경 가능
            </li>
            <li>
              <strong>사용 사례:</strong> DOM 조작, 이전 값 추적, 타이머/interval
              ID 저장
            </li>
            <li>
              <strong>vs useState:</strong> useState는 리렌더링 트리거, useRef는
              트리거 안 함
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

