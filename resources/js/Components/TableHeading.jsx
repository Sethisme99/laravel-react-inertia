import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export default function TableHeading({
  name,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  sortChanged = () => {},
  children,
}) {
  return (
    <th onClick={() => sortable && sortChanged(name)} className="px-4 py-3 text-left cursor-pointer">
      <div className="flex items-center gap-1">
        {children}
        {sortable && (
          <div className="flex flex-col">
            <ChevronUpIcon
              className={`w-3 ${sort_field === name && sort_direction === "asc" ? "text-white" : ""}`}
            />
            <ChevronDownIcon
              className={`w-3 -mt-1 ${sort_field === name && sort_direction === "desc" ? "text-white" : ""}`}
            />
          </div>
        )}
      </div>
    </th>
  );
}
