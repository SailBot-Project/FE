import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/dashboard/SearchBar';
import PieChart from '../../components/dashboard/PieChart';
import CommonList from '../../components/dashboard/CommonList';
import DetailDialog from '../../components/dashboard/DetailDialog';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Feedback = () => {
  const data = [
    { id: 1, title: "리액트 기초 배우기", content: "리액트의 기본적인 사용법과 컴포넌트 개념에 대해 배웁니다.", feedbackLabel: "positive", date: "2024-02-01" },
    { id: 2, title: "자바스크립트 튜토리얼", content: "자바스크립트 문법과 주요 기능들을 다룹니다.", feedbackLabel: "negative", date: "2024-01-15" },
    { id: 3, title: "리액트 Hooks 개념", content: "리액트에서 Hooks의 개념과 사용법을 소개합니다.", feedbackLabel: "improvement", date: "2024-03-10" },
    { id: 4, title: "프론트엔드 개발 시작하기", content: "프론트엔드 개발의 시작과 필요한 도구들을 알아봅니다.", feedbackLabel: "positive", date: "2024-02-25" },
    { id: 5, title: "백엔드와 리액트 연동", content: "백엔드와 리액트를 연동하여 실제 서비스를 만드는 방법을 배웁니다.", feedbackLabel: "positive", date: "2024-01-05" },
  ];

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [selectedData, setSelectedData] = useState(null);
  const [feedbackFilter, setFeedbackFilter] = useState('all');
  const [dateSort, setDateSort] = useState('desc');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const applyFilters = () => {
    let filtered = data;

    if (search) {
      filtered = filtered.filter(item => item.content.toLowerCase().includes(search.toLowerCase()));
    }

    if (feedbackFilter !== 'all') {
      filtered = filtered.filter(item => item.feedbackLabel === feedbackFilter);
    }

    if (startDate || endDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        const startMonth = startDate ? new Date(startDate.getFullYear(), startDate.getMonth(), 1) : null;
        const endMonth = endDate ? new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0) : null;
        return (!startMonth || itemDate >= startMonth) && (!endMonth || itemDate <= endMonth);
      });
    }

    filtered.sort((a, b) => dateSort === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));
    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [feedbackFilter, startDate, endDate]);

  return (
    <div style={{ padding: '20px' }}>
      <SearchBar search={search} onSearchChange={(e) => setSearch(e.target.value)} onSearchClick={applyFilters} />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <Button onClick={() => { setDateSort(dateSort === 'asc' ? 'desc' : 'asc'); applyFilters(); }}>
          날짜 정렬: {dateSort === 'asc' ? '오름차순' : '내림차순'}
        </Button>

        <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
          <DropdownToggle caret>
            피드백 필터: {feedbackFilter === 'all' ? '전체' : feedbackFilter}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setFeedbackFilter('all')}>전체</DropdownItem>
            <DropdownItem onClick={() => setFeedbackFilter('positive')}>긍정</DropdownItem>
            <DropdownItem onClick={() => setFeedbackFilter('negative')}>부정</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Button onClick={() => { setStartDate(null); setEndDate(null); }} color="secondary">
          전체 날짜 보기
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <DatePicker selected={startDate} onChange={setStartDate} placeholderText="시작 날짜 선택" showMonthYearPicker dateFormat="yyyy-MM" />
        <DatePicker selected={endDate} onChange={setEndDate} placeholderText="끝 날짜 선택" showMonthYearPicker dateFormat="yyyy-MM" />
      </div>

      <PieChart
        positive={filteredData.filter(item => item.feedbackLabel === 'positive').length}
        negative={filteredData.filter(item => item.feedbackLabel === 'negative').length}
        improvement={filteredData.filter(item => item.feedbackLabel === 'improvement').length}
      />

      <CommonList data={filteredData} searchData={search} onItemClick={setSelectedData} renderExtraColumn={(data) => (
        data.feedbackLabel === 'positive' ? <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
          : data.feedbackLabel === 'negative' ? <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
            : <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
      )} />

      <DetailDialog data={selectedData} isOpen={Boolean(selectedData)} toggleDialog={() => setSelectedData(null)} />
    </div>
  );
};

export default Feedback;
