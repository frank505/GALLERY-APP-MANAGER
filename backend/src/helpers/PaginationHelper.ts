
export const SkipPosition = (currPage:any,itemsPerpage:any) =>
{
    let skipPosition:number = 0;

   if(currPage!=null)
   {
    skipPosition = ((currPage * itemsPerpage) - (itemsPerpage ));
   }

   return skipPosition;
}




export const PaginationHelper = (totalCount:number,
    itemsPerPage:number,currentPage:number,data:any):object =>
{
  const firstPage:number = 1;
   const currPage:number = currentPage==null || currentPage==undefined ? 1 : currentPage;
  const totalPages:number = totalCount == 0 || itemsPerPage > totalCount ? 1 :  Math.ceil(totalCount/itemsPerPage);

  const paginatedData:object = {
     first_page : firstPage,
     last_page: totalPages,
     total:totalCount,
     per_page:itemsPerPage,
     current_page:currPage,
     data:data
  };

  return paginatedData;
}
