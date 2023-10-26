export default function CreateIdPage({
  params,
}: {
  params: { courseId: string }
}) {
  return <div className="mt-40">{params.courseId}</div>
}
