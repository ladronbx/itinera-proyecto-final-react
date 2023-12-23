import './PaginationButton.css'

export const PaginationButton = ({classPagination, text, changePagination}) => {
    
     return (
         <div className={classPagination} onClick={()=>changePagination() }>
            {text}
         </div>
     )
}