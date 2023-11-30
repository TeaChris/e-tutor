import { Combobox } from '@/components/ui/combobox'

interface ComboProps {
  options: { label: string; value: string }[]
}

export default function Combo({ options }: ComboProps) {
  return (
    <Combobox
      onChange={function (value: string): void {
        throw new Error('Function not implemented.')
      }}
      options={...options}
    />
  )
}
