'use client'

import { useId } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useChat } from 'ai/react'
import { useEffect, useState } from 'react'
import { type AskAIFields } from '@/lib/zod/schema'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import ReactMarkdown from 'react-markdown'

interface Props extends React.ComponentPropsWithRef<'div'> {
  fieldLabel: AskAIFields
}

export function AskAI({ fieldLabel }: Props) {
  const initialMessageID = useId()

  const [formResponse, setFormResponse] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const {
    error,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    append,
  } = useChat({
    body: {
      fieldLabel,
    },
  })

  useEffect(() => {
    if (open && !messages.length) {
      append({
        id: initialMessageID,
        role: 'user',
        content: `Could you provide guidance with this question?`,
      })
    }
  }, [open, messages])

  const handleClick = () => setOpen(true)

  return (
    <Dialog>
      <DialogTrigger
        className='flex items-center gap-2 text-stone-500'
        onClick={handleClick}
      >
        <p>Ask AI</p>
        <Sparkles size={16} />
      </DialogTrigger>

      <DialogContent className='bg-stone-200'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>Ask AI</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <output className='w-full min-h-48 max-h-48 overflow-y-scroll'>
          <ScrollArea>
            {messages.map((message) => {
              const isUser = message.role === 'user'

              return (
                <div
                  className={cn('mb-3 last:mb-0', {
                    'border border-stone-400 p-2 px-3 italic rounded-xl inline-flex opacity-50 mt-8 first:mt-0':
                      isUser,
                  })}
                  key={message.id}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ children, className, ...props }) => {
                        return (
                          <p
                            className={cn(
                              'mb-3 last:mb-0 antialiased',
                              className,
                            )}
                            {...props}
                          >
                            {children}
                          </p>
                        )
                      },
                      ol: ({ children, className }) => {
                        return (
                          <ol className={cn('list-decimal my-3', className)}>
                            {children}
                          </ol>
                        )
                      },
                      ul: ({ children, className }) => {
                        return (
                          <ul className={cn('list-disc my-3', className)}>
                            {children}
                          </ul>
                        )
                      },
                      li: ({ children, className }) => {
                        return (
                          <li
                            className={cn(
                              'mb-3 antialiased list-inside',
                              className,
                            )}
                          >
                            {children}
                          </li>
                        )
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              )
            })}
          </ScrollArea>
        </output>

        <form onSubmit={handleSubmit}>
          <div className='relative flex items-center'>
            <Input
              className='pr-12 rounded-lg placeholder:text-base'
              type='text'
              placeholder='Ask AI something...'
              value={input}
              onChange={handleInputChange}
            />

            <Button className='absolute rounded-full w-6 h-6 p-0 right-2'>
              <ArrowRight size={18} />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
