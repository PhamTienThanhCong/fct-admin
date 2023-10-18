import React, { useState } from "react";
import { Table } from "antd";
import ListPagination from "./ListPagination";
import type { TableProps, ColumnType } from "antd/es/table";

interface IDynamicListProps {
	keyId: string;
	listData: any[];
	listColumn: ColumnType<any>[];
	isHideNumberRecord?: boolean;
	isHideCheckBox?: boolean;
	onClickBtn?: () => void;
	onSort?: (sort: string) => void;
	onPageChange?: (page_number: number, page_size: number) => void;
	listChecked?: (list: string[]) => void;
	isHidePaging?: boolean;
	nullListingType?: string;
	rowSelection?: TableProps<any>["rowSelection"];
	pageNumber: number;
	pageSize: number;
	totalCount: number;
}

const DynamicList = (props: IDynamicListProps) => {
	const handleChangePage = (page_number: number, page_size: number) => {
		if (props.onPageChange) {
			props.onPageChange(page_number, page_size);
		}
	};

	const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

	const onSelectChange = (newSelectedRowKeys: string[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
		if (props.listChecked) {
			props.listChecked(newSelectedRowKeys);
		}
	};

	const rowSelection = {
		selectedRowKeys: selectedRowKeys, // Đảm bảo kiểu của selectedRowKeys là string[]
		onChange: (newSelectedRowKeys: React.Key[], selectedRows: any[]) => {
			onSelectChange(newSelectedRowKeys as string[]); // Sử dụng as để chuyển đổi kiểu
		},
	};

	const onChange: TableProps<any>["onChange"] = (pagination, filters, sorter, extra) => {
		if (props.onSort) {
			if (typeof sorter === "string") {
				// Nếu sorter là một string, bạn có thể truyền nó trực tiếp vào props.onSort
				props.onSort(sorter);
			}
			// TODO
		}
	};

	return (
		<>
			<Table
				rowKey={props.keyId}
				columns={props.listColumn}
				dataSource={props.listData}
				onChange={onChange}
				pagination={false}
				rowSelection={props.rowSelection ? rowSelection : undefined}
        scroll={{ y: 350 }}
			/>
			{props.listData.length > 0 && !props.isHidePaging && (
				<ListPagination
					pageNumber={props.pageNumber}
					total={props.totalCount || 0}
					pageSize={props.pageSize}
					onShowSizeChange={handleChangePage}
					onPageChange={handleChangePage} 
					handleChangePage={handleChangePage}
				/>
			)}
		</>
	);
};

export default DynamicList;
