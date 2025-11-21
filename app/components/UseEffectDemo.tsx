'use client';

import { useState, useEffect } from 'react';

/**
 * useEffect 훅 실습 컴포넌트
 * - 마운트/언마운트 시 실행
 * - 의존성 배열
 * - 클린업 함수
 * - 데이터 페칭 시뮬레이션
 */

export default function UseEffectDemo() {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [fetchedData, setFetchedData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mountTime, setMountTime] = useState<Date | null>(null);

  // 1. 컴포넌트 마운트 시 한 번만 실행 (빈 의존성 배열)
  useEffect(() => {
    console.log('✅ 컴포넌트가 마운트되었습니다!');
    setMountTime(new Date());

    // 클린업 함수: 언마운트 시 실행
    return () => {
      console.log('❌ 컴포넌트가 언마운트되었습니다!');
    };
  }, []);

  // 2. 특정 상태 변경 시마다 실행
  useEffect(() => {
    console.log(`📊 count가 변경되었습니다: ${count}`);
    document.title = `Count: ${count}`;

    // 클린업: 다음 effect 실행 전에 호출
    return () => {
      console.log(`🧹 이전 count 클린업: ${count}`);
    };
  }, [count]);

  // 3. 타이머 예제 (클린업 함수 중요)
  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      // 클린업: 타이머 정리
      return () => {
        console.log('⏱️ 타이머를 정리합니다');
        clearInterval(interval);
      };
    }
  }, [isTimerRunning]);

  // 4. 디바운싱 예제
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      console.log(`🔍 검색어 디바운싱: ${searchTerm}`);
    }, 500);

    // 클린업: 이전 타이머 취소
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // 5. 데이터 페칭 시뮬레이션
  useEffect(() => {
    if (debouncedTerm) {
      setIsLoading(true);
      setFetchedData(null);

      // API 호출 시뮬레이션
      const fetchData = async () => {
        try {
          // 실제로는 fetch나 axios 사용
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setFetchedData(`"${debouncedTerm}"에 대한 검색 결과입니다.`);
        } catch (error) {
          console.error('데이터 페칭 에러:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    } else {
      setFetchedData(null);
    }
  }, [debouncedTerm]);

  const toggleTimer = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
    } else {
      setIsTimerRunning(true);
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setSeconds(0);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🎣 useEffect 훅 실습
      </h2>

      <div className="space-y-6">
        {/* 마운트 정보 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            1. 컴포넌트 라이프사이클
          </h3>
          <div className="p-3 bg-blue-100 rounded">
            <p className="text-blue-800">
              마운트 시간: {mountTime?.toLocaleTimeString() || '로딩중...'}
            </p>
            <p className="text-sm text-blue-600 mt-2">
              💡 콘솔을 열어서 마운트/언마운트 로그를 확인하세요!
            </p>
          </div>
        </section>

        {/* count 변경 감지 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            2. 의존성 배열 (Dependency Array)
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            count가 변경될 때마다 useEffect가 실행됩니다.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCount(count - 1)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -1
            </button>
            <span className="text-2xl font-bold">{count}</span>
            <button
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +1
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            💡 브라우저 탭 제목도 변경됩니다!
          </p>
        </section>

        {/* 타이머 (클린업 함수) */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            3. 클린업 함수 (Cleanup Function)
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            타이머를 시작하면 클린업 함수로 정리됩니다.
          </p>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl font-bold text-blue-600">
              {String(Math.floor(seconds / 60)).padStart(2, '0')}:
              {String(seconds % 60).padStart(2, '0')}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleTimer}
              className={`px-4 py-2 rounded text-white ${
                isTimerRunning
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isTimerRunning ? '⏸️ 정지' : '▶️ 시작'}
            </button>
            <button
              onClick={resetTimer}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              🔄 리셋
            </button>
          </div>
        </section>

        {/* 디바운싱 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            4. 디바운싱 (Debouncing)
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            입력 후 0.5초 뒤에 검색이 실행됩니다.
          </p>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력하세요..."
            className="px-4 py-2 border border-gray-300 rounded w-full mb-3"
          />
          <div className="space-y-2">
            <p className="text-sm">
              <strong>현재 입력:</strong> {searchTerm || '(없음)'}
            </p>
            <p className="text-sm">
              <strong>디바운싱된 값:</strong> {debouncedTerm || '(없음)'}
            </p>
          </div>
        </section>

        {/* 데이터 페칭 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            5. 데이터 페칭 시뮬레이션
          </h3>
          {isLoading && (
            <div className="p-4 bg-yellow-100 rounded text-yellow-800">
              ⏳ 데이터를 불러오는 중...
            </div>
          )}
          {!isLoading && fetchedData && (
            <div className="p-4 bg-green-100 rounded text-green-800">
              ✅ {fetchedData}
            </div>
          )}
          {!isLoading && !fetchedData && debouncedTerm && (
            <div className="p-4 bg-gray-100 rounded text-gray-600">
              결과가 없습니다.
            </div>
          )}
        </section>

        {/* 추가 정보 */}
        <section className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-blue-800">
            📚 useEffect 핵심 개념
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <strong>빈 배열 []:</strong> 마운트 시 한 번만 실행
            </li>
            <li>
              <strong>의존성 배열 [dep]:</strong> dep 변경 시마다 실행
            </li>
            <li>
              <strong>의존성 배열 없음:</strong> 모든 렌더링마다 실행
            </li>
            <li>
              <strong>클린업 함수:</strong> 언마운트 또는 다음 effect 전에 실행
            </li>
            <li>
              <strong>주의사항:</strong> 무한 루프, 메모리 누수 방지 필요
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

