'use client';

import { useState } from 'react';

/**
 * 리액트 기본 개념 실습 컴포넌트
 * - Props 전달
 * - State 관리
 * - 이벤트 핸들링
 * - 조건부 렌더링
 * - 리스트 렌더링
 */

interface ChildProps {
  name: string;
  age: number;
  onGreet: (message: string) => void;
}

// 자식 컴포넌트 - Props 받기
function ChildComponent({ name, age, onGreet }: ChildProps) {
  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <h3 className="font-semibold text-blue-800">자식 컴포넌트</h3>
      <p className="text-gray-700">이름: {name}</p>
      <p className="text-gray-700">나이: {age}</p>
      <button
        onClick={() => onGreet(`안녕하세요! 저는 ${name}입니다.`)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        인사하기
      </button>
    </div>
  );
}

export default function BasicConcepts() {
  // State 관리
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [items, setItems] = useState(['사과', '바나나', '오렌지']);
  const [newItem, setNewItem] = useState('');
  const [greeting, setGreeting] = useState('');

  // 이벤트 핸들러
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleReset = () => setCount(0);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleGreeting = (message: string) => {
    setGreeting(message);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🎯 리액트 기본 개념 실습
      </h2>

      <div className="space-y-6">
        {/* State와 이벤트 핸들링 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            1. State와 이벤트 핸들링
          </h3>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDecrement}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -1
            </button>
            <span className="text-2xl font-bold text-gray-800">{count}</span>
            <button
              onClick={handleIncrement}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +1
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              초기화
            </button>
          </div>
        </section>

        {/* 폼 입력 처리 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            2. 폼 입력 처리
          </h3>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="텍스트를 입력하세요"
            className="px-4 py-2 border border-gray-300 rounded w-full mb-2"
          />
          <p className="text-gray-700">
            입력한 값: <strong>{inputValue}</strong>
          </p>
          <p className="text-sm text-gray-500">글자 수: {inputValue.length}</p>
        </section>

        {/* 조건부 렌더링 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            3. 조건부 렌더링
          </h3>
          <button
            onClick={toggleVisibility}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mb-3"
          >
            {isVisible ? '숨기기' : '보이기'}
          </button>
          {isVisible && (
            <div className="p-4 bg-purple-100 rounded">
              <p className="text-purple-800">
                이 메시지는 조건부로 렌더링됩니다! 🎉
              </p>
            </div>
          )}
        </section>

        {/* 리스트 렌더링 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            4. 리스트 렌더링
          </h3>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder="새 항목 추가"
              className="px-4 py-2 border border-gray-300 rounded flex-1"
            />
            <button
              onClick={handleAddItem}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              추가
            </button>
          </div>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-white rounded border"
              >
                <span>{item}</span>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Props 전달 */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            5. Props 전달 (부모 → 자식)
          </h3>
          <ChildComponent name="김철수" age={25} onGreet={handleGreeting} />
          {greeting && (
            <div className="mt-3 p-3 bg-green-100 rounded">
              <p className="text-green-800">받은 인사: {greeting}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

