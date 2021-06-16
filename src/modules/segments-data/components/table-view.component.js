import React from 'react';
import { SectionCard } from '../../../components/card';
import { useStyleSheet, StyleService } from '@ui-kitten/components';
import Table from 'react-native-awesome-table/src/components/Table';


export const TableView = ({columns, data, isLoading = false, loadingText = "Loading..."}) => {
    
    const count = React.useMemo(() => data.length, [data]);
    const styles = useStyleSheet(themedStyles);
    
   
    return (
        <SectionCard title={`Segments Data (${count})`}>
            <Table
                columns={columns}
                data={data}
                showHeader={true}
                stickyHeader={true}
                headerRowStyle={styles.tableRowHeader}
                headerRowTextStyle={styles.tableRowHeaderText}
                isLoading={isLoading}
                loadingText={loadingText}
                loaddingTextStyle={styles.loadingText}
            />
        </SectionCard>
    );
};

const themedStyles = StyleService.create({
    container: {
        flex: 1,
      },
      tableRowHeader: {
          maxHeight: 30,
          minHeight: 30,
      },
      tableRowHeaderText: {
        fontWeight: "bold"
      },
      loadingText: {
          fontWeight: "bold",
          fontSize: 25,
          alignSelf: "center",
          color: "black",
          paddingVertical: 50
      }
});