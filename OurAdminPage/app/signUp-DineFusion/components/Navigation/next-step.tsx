"use client"

import { useInfos } from "../../stores/infos"
import { usePlan } from "../../stores/plan"
import { shallow } from 'zustand/shallow'
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo } from "react"
import { toast } from 'react-hot-toast';

const routes = ['/signUp-DineFusion','/signUp-DineFusion/plan','/signUp-DineFusion/add-ons','/signUp-DineFusion/summary','/signUp-DineFusion/thank']

export default function NextStepNavigation() {
  // Next Navigation
  const path = usePathname()
  const router = useRouter()

  // Page stores
  const infosCompleted = useInfos(state=>state.completed)
  const plan = usePlan(state=>state.plan,shallow)

  // In order to push to the next step
  const nextPath = useMemo(()=>{
    let next = routes[routes.indexOf(path)+1]
    return next
  },[path])

  useEffect(()=>{
    if(nextPath) router.prefetch(nextPath)
  },[nextPath,router])

  // Check infos before pushing
  const toNext = useCallback(() => {
    let canPush = true
    if(path === '/signUp-DineFusion') canPush = infosCompleted  // else Check errors
    if(path === '/signUp-DineFusion/plan') canPush = plan !== null
    if (canPush) {
      if (nextPath === '/signUp-DineFusion/thank') {
        
        toast.success('Thank you for your confirmation!');
      }
      router.push(nextPath);
    }
  },[path,infosCompleted,nextPath,router,plan])


  if (path === "/signUp-DineFusion/thank") return null
  return (
    <div className="flex items-center justify-between">
      {path !== '/signUp-DineFusion' && <span onClick={()=>router.back()} className='block w-fit text-muted-dark transition cursor-pointer hover:text-primary'>Go Back</span>}
      <button onClick={toNext} type="button" className={`bg-white py-2.5 px-5 ml-auto w-fit rounded-md text-alabaster transition  ${nextPath !== '/signUp-DineFusion/thank' ? 'bg-primary hover:bg-primary/90' : 'bg-confirm hover:bg-confirm/90'}`}>{nextPath==='/signUp-DineFusion/thank'?'Confirm':'Next Step'}</button>
    </div>
  )
}
