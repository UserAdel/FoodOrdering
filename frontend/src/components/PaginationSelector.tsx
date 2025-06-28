import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {
    page: number;
    pages: number;
    onpageChange: (page: number) => void;
}


const PaginationSelector = ({ page, pages, onpageChange }: Props) => {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }
    return (  
        <Pagination>
            <PaginationContent  >
                {page !==1 && (
                    <PaginationItem>
            <PaginationPrevious href="#" onClick={()=>onpageChange(page-1)}/>
                    </PaginationItem>
                )}
                {pageNumbers.map((number)=>(
                    <PaginationItem key={number}>
                        <PaginationLink href="#" onClick={()=>onpageChange(number)}
                        isActive={number===page}
                        >
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {page!==pageNumbers.length && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={()=>onpageChange(page+1)}/>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>

    )
}
export default PaginationSelector;