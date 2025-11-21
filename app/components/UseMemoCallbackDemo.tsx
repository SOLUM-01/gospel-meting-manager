'use client';

import { useState, useMemo, useCallback, memo } from 'react';

/**
 * useMemo와 useCallback 훅 실습 컴포넌트
 * - useMemo: 계산 비용이 높은 값 메모이제이션
 * - useCallback: 함수 메모이제이션
 * - React.memo: 컴포넌트 메모이제이션
 * - 성능 최적화
 */

// 무거운 계산 함수 시뮬레이션
function expensiveCalculation(num: number): number {
  console.log('💰 무거운 계산 실행중...');
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += num;
  }
  return result;
}

// 메모이제이션된 자식 컴포넌트
const MemoizedChild = memo(function Child({
  name,
  onButtonClick,
}: {
  name: string;
  onButtonClick: () => void;
}) {
  console.log(`🔄 ${name} 컴포넌트 렌더링됨`);

  return (
    <div className="p-3 bg-blue-100 rounded">
      <p className="text-blue-800 mb-2">
        <strong>{name}</strong> (메모이제이션됨)
      </p>
      <button
        onClick={onButtonClick}
        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
      >
        클릭
      </button>
      <p className="text-xs text-gray-600 mt-2">
        💡 콘솔에서 렌더링 로그를 확인하세요
      </p>
    </div>
  );
});

// 일반 자식 컴포넌트 (메모이제이션 안 됨)
function NormalChild({ name }: { name: string }) {
  console.log(`🔄 ${name} 컴포넌트 렌더링됨`);

  return (
    <div className="p-3 bg-red-100 rounded">
      <p className="text-red-800">
        <strong>{name}</strong> (일반)
      </p>
      <p className="text-xs text-gray-600 mt-2">
        💡 부모가 렌더링될 때마다 함께 렌더링됩니다
      </p>
    </div>
  );
}

// 할 일 아이템 컴포넌트
const TodoItem = memo(function TodoItem({
  todo,
  onToggle,
  onRemove,
}: {
  todo: { id: number; text: string; done: boolean };
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  console.log(`📝 Todo ${todo.id} 렌더링됨`);

  return (
    <div className="flex items-center justify-between p-2 bg-white rounded border">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          className="w-4 h-4"
        />
        <span className={todo.done ? 'line-through text-gray-500' : ''}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onRemove(todo.id)}
        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
      >
        삭제
      </button>
    </div>
  );
});

export default function UseMemoCallbackDemo() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState(1);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: 'useMemo 공부하기', done: false },
    { id: 2, text: 'useCallback 공부하기', done: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  // useMemo 없이: count가 변경될 때마다 무거운 계산 실행됨
  // const calculatedValue = expensiveCalculation(input);

  // useMemo 사용: input이 변경될 때만 계산 실행
  const calculatedValue = useMemo(() => {
    return expensiveCalculation(input);
  }, [input]);

  // 배열 필터링 메모이제이션
  const completedTodos = useMemo(() => {
    console.log('✅ 완료된 할 일 필터링');
    return todos.filter((todo) => todo.done);
  }, [todos]);

  const incompleteTodos = useMemo(() => {
    console.log('⏳ 미완료 할 일 필터링');
    return todos.filter((todo) => !todo.done);
  }, [todos]);

  // useCallback 없이: 렌더링마다 새 함수 생성
  // const handleClick = () => {
  //   alert('버튼 클릭!');
  // };

  // useCallback 사용: 함수 재사용
  const handleClick = useCallback(() => {
    alert('버튼 클릭!');
  }, []);

  const handleClickWithDep = useCallback(() => {
    alert(`현재 count: ${count}`);
  }, [count]);

  // Todo 관련 콜백들
  const handleToggleTodo = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, []);

  const handleRemoveTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleAddTodo = useCallback(() => {
    if (newTodo.trim()) {
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), text: newTodo, done: false },
      ]);
      setNewTodo('');
    }
  }, [newTodo]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🎣 useMemo & useCallback 실습
      </h2>

      <div className="space-y-6">
        {/* useMemo 데모 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            1. useMemo - 값 메모이제이션
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            무거운 계산을 메모이제이션하여 불필요한 재계산을 방지합니다.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                계산 입력값 (input 변경 시에만 재계산)
              </label>
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(Number(e.target.value))}
                className="px-3 py-2 border rounded w-full"
              />
            </div>

            <div className="p-3 bg-green-100 rounded">
              <p className="text-green-800">
                <strong>계산 결과:</strong> {calculatedValue}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                테스트용 카운터 (count 변경 시 재계산 안 됨)
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCount(count - 1)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  -1
                </button>
                <span className="text-xl font-bold">{count}</span>
                <button
                  onClick={() => setCount(count + 1)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  +1
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                💡 count를 변경해도 계산이 다시 실행되지 않습니다 (콘솔 확인)
              </p>
            </div>
          </div>
        </section>

        {/* useCallback 데모 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            2. useCallback - 함수 메모이제이션
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            함수를 메모이제이션하여 자식 컴포넌트의 불필요한 리렌더링을
            방지합니다.
          </p>

          <div className="space-y-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="텍스트 입력 (리렌더링 유발)"
              className="px-3 py-2 border rounded w-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <MemoizedChild name="자식 A" onButtonClick={handleClick} />
              <MemoizedChild name="자식 B" onButtonClick={handleClickWithDep} />
            </div>

            <NormalChild name="일반 자식 C" />

            <p className="text-xs text-gray-600">
              💡 텍스트를 입력하면 일반 자식만 리렌더링됩니다 (콘솔 확인)
            </p>
          </div>
        </section>

        {/* 실전 예제: Todo 리스트 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            3. 실전 예제: 최적화된 Todo 리스트
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            useMemo, useCallback, React.memo를 모두 활용한 성능 최적화
          </p>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
                placeholder="새 할 일"
                className="px-3 py-2 border rounded flex-1"
              />
              <button
                onClick={handleAddTodo}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                추가
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">
                  미완료 ({incompleteTodos.length})
                </h4>
                <div className="space-y-2">
                  {incompleteTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={handleToggleTodo}
                      onRemove={handleRemoveTodo}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">
                  완료 ({completedTodos.length})
                </h4>
                <div className="space-y-2">
                  {completedTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={handleToggleTodo}
                      onRemove={handleRemoveTodo}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600">
              💡 할 일을 토글하면 해당 아이템만 리렌더링됩니다 (콘솔 확인)
            </p>
          </div>
        </section>

        {/* 핵심 개념 정리 */}
        <section className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-purple-800">
            📚 핵심 개념 정리
          </h3>

          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-purple-700">useMemo</h4>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>계산 비용이 높은 값을 메모이제이션</li>
                <li>의존성 배열의 값이 변경될 때만 재계산</li>
                <li>
                  사용 사례: 복잡한 계산, 배열 필터링/정렬, 객체 생성
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-purple-700">useCallback</h4>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>함수를 메모이제이션</li>
                <li>의존성 배열의 값이 변경될 때만 함수 재생성</li>
                <li>
                  사용 사례: 자식 컴포넌트에 props로 전달하는 함수
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-purple-700">React.memo</h4>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>컴포넌트를 메모이제이션</li>
                <li>props가 변경되지 않으면 리렌더링 스킵</li>
                <li>useCallback과 함께 사용하면 효과적</li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-100 rounded">
              <p className="font-semibold text-yellow-800">⚠️ 주의사항</p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-yellow-800">
                <li>모든 곳에 사용하지 말 것 (과도한 최적화)</li>
                <li>간단한 계산은 메모이제이션 불필요</li>
                <li>성능 문제가 있을 때만 사용</li>
                <li>의존성 배열을 정확하게 작성할 것</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

