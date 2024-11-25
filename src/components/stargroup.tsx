import { cn } from '@/lib/utils'

interface Props extends React.SVGAttributes<SVGElement> {
  fill?: string
}

export function StarGroup({ fill = '#F5F5F4', className }: Props) {
  return (
    <svg
      width='130'
      height='26'
      viewBox='0 0 130 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(className)}
    >
      <path
        d='M13 0L15.9187 8.98278H25.3637L17.7225 14.5344L20.6412 23.5172L13 17.9656L5.35879 23.5172L8.27747 14.5344L0.636266 8.98278H10.0813L13 0Z'
        fill={fill}
      />
      <path
        d='M39 0L41.9187 8.98278H51.3637L43.7225 14.5344L46.6412 23.5172L39 17.9656L31.3588 23.5172L34.2775 14.5344L26.6363 8.98278H36.0813L39 0Z'
        fill={fill}
      />
      <path
        d='M65 0L67.9187 8.98278H77.3637L69.7225 14.5344L72.6412 23.5172L65 17.9656L57.3588 23.5172L60.2775 14.5344L52.6363 8.98278H62.0813L65 0Z'
        fill={fill}
      />
      <path
        d='M91 0L93.9187 8.98278H103.364L95.7225 14.5344L98.6412 23.5172L91 17.9656L83.3588 23.5172L86.2775 14.5344L78.6363 8.98278H88.0813L91 0Z'
        fill={fill}
      />
      <path
        d='M117 0L119.919 8.98278H129.364L121.723 14.5344L124.641 23.5172L117 17.9656L109.359 23.5172L112.277 14.5344L104.636 8.98278H114.081L117 0Z'
        fill={fill}
      />
    </svg>
  )
}
