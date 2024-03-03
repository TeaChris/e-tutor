import { UserProfile } from '@clerk/nextjs'

export default async function Page() {
  return (
    <div className="w-full space-y-4 px-2">
      <h4 className="text-xl text-black font-medium">Account Settings</h4>

      <div className="w-[90%] min-h-max">
        <UserProfile
          appearance={{
            elements: {
              rootBox: {
                boxShadow: 'none',
                width: '100%',
              },
              card: {
                border: '1px solid #e5e5e5',
                boxShadow: 'none',
                width: '100%',
              },
            },
          }}
        />
      </div>
    </div>
  )
}
