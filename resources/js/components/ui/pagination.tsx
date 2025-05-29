import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Link } from "@inertiajs/react"
import { SelectValue } from "@radix-ui/react-select";

interface LinkProps {
    active: boolean;
    label: string;
    url: string | null;
}

interface PaginationData {
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface PaginationProps {
    products: PaginationData;
    perPage: string;
    onPerPageChange: (value: string) => void;
    totalCount: number;
    filteredCount: number;
    search: string;
}

export const Pagination = ({ products, perPage, onPerPageChange, totalCount, filteredCount, search } : PaginationProps) => {
    return (
        <div className="flex items-center justify-between mt-4">

            {/* Pagination information */}
            {search ? (
                <p>Showing <strong>{filteredCount}</strong> filtered result{filteredCount !== 1 && 's'} out of <strong>{totalCount}</strong> entr{totalCount !== 1 ? 'ies' : 'y'} </p>

            ) : (
                <p>Showing <strong>{products.from}</strong> to <strong>{products.to}</strong> out of <strong>{products.total}</strong> entr{totalCount !== 1 ? 'ies' : 'y'} </p>
            )}

            {/* Select Per Page */}
            <div className="flex items-center gap-2">
                <span className="text-sm"> Row per page:</span>
                <Select onValueChange={onPerPageChange} value={perPage}>
                    <SelectTrigger className="w-[90px]">
                        <SelectValue placeholder="Row" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="-1">All</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Pagination Link */}
            <div className="flex gap-2">
                {products.links.map((link, index) => (
                    <Link
                        className={`px-3 py-2 border rounded ${link.active ? 'bg-gray-700 text-white' : ''}`}
                        href={link.url || '#'}
                        key={index}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    )

}
