interface Props extends React.ComponentPropsWithoutRef<'div'> {
  when: boolean
}

export function Show({ when, children }: Props) {
  return when ? <>{children}</> : null
}
