import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import DownloadMemeButton from '@/components/MemeListItem/DownloadMemeButton'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Skeleton,
  Spacer
} from '@nextui-org/react'
import {
  DownloadSimple,
  Pen,
  Share,
  XLogo
} from '@phosphor-icons/react/dist/ssr'
import type { Meme } from '@prisma/client'

const ShareMemeButton = dynamic(
  () => {
    return import('@/components/MemeListItem/ShareMemeButton')
  },
  { ssr: false }
)

export type MemeListItemProps =
  | {
      meme: Meme
      isLoading?: never
    }
  | {
      meme?: never
      isLoading: true
    }

const MemeListItem = ({ meme }: MemeListItemProps) => {
  return (
    <Card>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        {meme ? (
          <div className="w-3/4">
            <Link href={`/library/${meme.id}`}>
              <h4 className="font-semibold text-medium truncate">
                {meme.title}
              </h4>
            </Link>
          </div>
        ) : (
          <Skeleton className="w-4/5 rounded-lg">
            <div className="w-full text-medium">
              <span className="bg-default-200">{'\u00A0'}</span>
            </div>
          </Skeleton>
        )}
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="h-56 lg:h-44 aspect-video w-full">
          {meme ? (
            <video
              controls
              className="w-full h-full object-cover rounded-lg"
              src={meme.videoUrl}
              width={270}
              preload="metadata"
              height={200}
            />
          ) : (
            <Skeleton className="rounded-lg w-full h-full" />
          )}
        </div>
      </CardBody>
      <Spacer y={2} />
      <Divider />
      <CardFooter>
        {meme ? (
          <div className="w-full flex justify-end gap-2">
            <ShareMemeButton size="sm" isIconOnly meme={meme}>
              <Share size={20} />
            </ShareMemeButton>
            <DownloadMemeButton size="sm" isIconOnly meme={meme}>
              <DownloadSimple size={20} />
            </DownloadMemeButton>
            <Button
              as={Link}
              href={`/library/${meme.id}`}
              size="sm"
              isIconOnly
              color="primary"
              aria-label="Editer"
            >
              <Pen size={20} />
            </Button>
            {meme.twitterUrl ? (
              <Button
                as="a"
                href={meme.twitterUrl}
                target="_blank"
                size="sm"
                isIconOnly
                className="bg-black text-white"
                aria-label="Visiter le status Twitter"
              >
                <XLogo size={20} />
              </Button>
            ) : null}
          </div>
        ) : (
          <Skeleton className="rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
        )}
      </CardFooter>
    </Card>
  )
}

export default MemeListItem
