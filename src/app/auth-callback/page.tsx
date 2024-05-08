'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { getAuthStatus } from '@/server-actions/authCallback'

const Page = () => {
    
  const [configId, setConfigId] = useState<string | null>(null)
  const [resp, setResp] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const configurationId = localStorage.getItem('configurationId')
    if (configurationId) setConfigId(configurationId)
  }, [])

  const fetchAuthStatus = async () => {
    try {
      const response = await getAuthStatus();
      setResp(response.success);
    } catch (err:any) {
      console.error(err)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAuthStatus();
    };

    const intervalId = setInterval(fetchData, 500);

    return () => clearInterval(intervalId);
  }, []);

  if (resp===true) {
    if (configId) {
      localStorage.removeItem('configurationId')
      router.push(`/configure/preview?id=${configId}`)
    } else {
      router.push('/')
    }
  }

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
        <h3 className='font-semibold text-xl'>Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
}

export default Page