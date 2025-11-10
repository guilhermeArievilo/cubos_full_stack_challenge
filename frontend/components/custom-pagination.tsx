'use client'
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { usePagination } from "@/hooks/use-pagination"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  currentPage: number
  totalPages: number
  paginationItemsToDisplay?: number
}

export default function CustomPagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
}: PaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  })

  const router = useRouter();
  const searchParams = useSearchParams();

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`?${params.toString()}`)
  }

  return (
    <Pagination>
      <PaginationContent className="inline-flex gap-4 -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
        <PaginationItem>
          <PaginationLink
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "rounded-none shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50 px-6! border-none"
            )}
            aria-label="Ir para página anterior"
            aria-disabled={currentPage === 1 ? true : undefined}
            role={currentPage === 1 ? "link" : undefined}
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          >
            <ChevronLeftIcon size={16} aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>

        {/* Left ellipsis (...) */}
        {showLeftEllipsis && (
          <PaginationItem className="[&:first-child>a]:rounded-s-md [&:last-child>a]:rounded-e-md">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Page number links */}
        {pages.map((page, index) => (
          <PaginationItem key={page}>
            <PaginationLink
              className={cn(
                buttonVariants({
                  variant: "default",
                }),
                "rounded-none shadow-none focus-visible:z-10 border-none",
                page === currentPage && "bg-accent"
              )}
              onClick={() => handlePageChange(index + 1)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Right ellipsis (...) */}
        {showRightEllipsis && (
          <PaginationItem className="[&:first-child>a]:rounded-s-md [&:last-child>a]:rounded-e-md">
            <PaginationEllipsis
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "pointer-events-none rounded-none shadow-none"
              )}
            />
          </PaginationItem>
        )}

        {/* Next page button */}
        <PaginationItem className="border-none!">
          <PaginationLink
            className={cn(
              buttonVariants({
                variant: "default",
              }),
              "rounded-none shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50 px-6! border-none"
            )}
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            aria-label="Go to next page"
            aria-disabled={currentPage === totalPages ? true : undefined}
            role={currentPage === totalPages ? "link" : undefined}
          >
            <ChevronRightIcon size={16} aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
