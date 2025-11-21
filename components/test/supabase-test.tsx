'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getAllParticipants, createParticipant } from '@/lib/database/api/participants'
import { getPublicSchedules } from '@/lib/database/api/schedules'
import { getPublicTasks } from '@/lib/database/api/tasks'
import { getAllTeams } from '@/lib/database/api/teams'

export function SupabaseTest() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTest = async (testFn: () => Promise<any>, testName: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await testFn()
      setResult({ testName, data, count: Array.isArray(data) ? data.length : 1 })
      alert(`✅ ${testName} 성공!`)
    } catch (err: any) {
      setError(err.message)
      alert(`❌ ${testName} 실패: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testParticipants = () => handleTest(getAllParticipants, '참가자 조회')
  const testSchedules = () => handleTest(getPublicSchedules, '일정 조회')
  const testTasks = () => handleTest(getPublicTasks, '할일 조회')
  const testTeams = () => handleTest(getAllTeams, '팀 조회')

  const testCreateParticipant = () =>
    handleTest(
      () =>
        createParticipant({
          name: '테스트 사용자',
          nameZh: '测试用户',
          phone: '010-0000-0000',
          role: 'member',
          nationality: 'KR',
        }),
      '참가자 생성'
    )

  return (
    <div className="p-6 space-y-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Supabase 연동 테스트</h2>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            각 버튼을 클릭하여 Supabase 연동이 정상적으로 작동하는지 확인하세요.
          </p>
          <p className="text-sm text-gray-600">
            먼저 Supabase에서 테이블을 생성하고 환경 변수를 설정해야 합니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <Button onClick={testParticipants} disabled={loading} variant="outline">
            참가자 조회
          </Button>
          <Button onClick={testSchedules} disabled={loading} variant="outline">
            일정 조회
          </Button>
          <Button onClick={testTasks} disabled={loading} variant="outline">
            할일 조회
          </Button>
          <Button onClick={testTeams} disabled={loading} variant="outline">
            팀 조회
          </Button>
          <Button onClick={testCreateParticipant} disabled={loading} variant="default">
            참가자 생성 테스트
          </Button>
        </div>

        {loading && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">⏳ 로딩 중...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-semibold">❌ 에러 발생:</p>
            <p className="text-red-600 text-sm mt-2">{error}</p>
            <div className="mt-3 text-xs text-red-700">
              <p className="font-semibold">해결 방법:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Supabase 프로젝트가 생성되었는지 확인</li>
                <li>.env.local 파일에 올바른 API 키가 있는지 확인</li>
                <li>create_tables.sql이 실행되었는지 확인</li>
                <li>개발 서버를 재시작했는지 확인</li>
              </ul>
            </div>
          </div>
        )}

        {result && !error && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-semibold mb-2">
              ✅ {result.testName} 성공!
            </p>
            {result.count !== undefined && (
              <p className="text-green-700 text-sm mb-3">
                총 {result.count}개의 데이터를 찾았습니다.
              </p>
            )}
            <div className="mt-3">
              <p className="text-xs text-gray-600 mb-2">응답 데이터:</p>
              <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-64">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6 bg-gray-50">
        <h3 className="font-semibold mb-2">📖 다음 단계</h3>
        <ol className="text-sm space-y-2 list-decimal list-inside">
          <li>위의 버튼들을 클릭하여 연동을 테스트하세요</li>
          <li>에러가 발생하면 docs/SUPABASE_SETUP.md를 참고하세요</li>
          <li>모든 테스트가 성공하면 sample_data.sql을 실행하여 샘플 데이터를 추가하세요</li>
          <li>실제 페이지에서 데이터를 사용해보세요</li>
        </ol>
      </Card>
    </div>
  )
}

