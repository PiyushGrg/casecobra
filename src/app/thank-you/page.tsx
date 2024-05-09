import { Suspense } from 'react'
import ThankYou from './_components/ThankYou'


const Page = () => {
  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  )
}

export default Page