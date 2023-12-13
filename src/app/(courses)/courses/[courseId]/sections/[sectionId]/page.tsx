import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { File } from 'lucide-react'
import { getSection } from '@/actions/get-section';

export default async function SectionIdPage({
  params,
}: {
  params: { courseId: string; sectionId: string }
}) {
    const { userId } = auth();
  
  if (!userId) {
    return redirect("/");
  } 

  const {
    section,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getSection({
    userId,
    sectionId: params.sectionId,
    courseId: params.courseId,
  });

  if (!section || !course) {
    return redirect("/")
  }


  const isLocked = !section.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  return <div></div>
}
