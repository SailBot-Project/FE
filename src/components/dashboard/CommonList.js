import React from 'react';
import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import NoResultsMessage from './NoResultMessage';
import HighlightSearchTerm from './HighlightSearchTerm';

const CommonList = ({ data, searchData, onItemClick, renderExtraColumn }) => (
    <Card>
      <CardHeader>리스트</CardHeader>
      <CardBody>
        {data.length === 0 ? <NoResultsMessage /> : (
          <Table striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>등록날짜</th>
                <th>내용</th>
                <th>분류</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} onClick={() => onItemClick(item)} style={{ cursor: 'pointer' }}>
                  <td>{item.id}</td>
                  <td>{item.date}</td>
                  <td>{HighlightSearchTerm(searchData, item.title)}</td>
                  <td>{renderExtraColumn(item)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </CardBody>
    </Card>
  );

  export default CommonList;