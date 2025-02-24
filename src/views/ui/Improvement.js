import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/dashboard/SearchBar';
import CommonList from '../../components/dashboard/CommonList';
import { Button, Card, CardBody } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Improvement = () => {
  const data = [
    { id: 1, title: "리액트 기초 배우기", content: "리액트의 기본적인 사용법과 컴포넌트 개념에 대해 배웁니다.", process: "imp1", date: "2024-02-01" },
    { id: 2, title: "자바스크립트 튜토리얼", content: "자바스크립트 문법과 주요 기능들을 다룹니다.", process: "imp1", date: "2024-01-15" },
    { id: 3, title: "리액트 Hooks 개념", content: "리액트에서 Hooks의 개념과 사용법을 소개합니다.", process: "imp2", date: "2024-03-10" },
    { id: 4, title: "프론트엔드 개발 시작하기", content: "프론트엔드 개발의 시작과 필요한 도구들을 알아봅니다.", process: "imp3", date: "2024-02-25" },
    { id: 5, title: "백엔드와 리액트 연동", content: "백엔드와 리액트를 연동하여 실제 서비스를 만드는 방법을 배웁니다.", process: "imp4", date: "2024-01-05" },
  ];

  const categories = [
    { key: 'imp1', label: '개선필요' },
    { key: 'imp2', label: '개선' },
    { key: 'imp3', label: '테스트' },
    { key: 'imp4', label: '완료' },
  ];

  const [searchStates, setSearchStates] = useState({});
  const [dateFilters, setDateFilters] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [dateSort, setDateSort] = useState('desc');

  useEffect(() => {
    applyFilters();
  }, [dateFilters, dateSort]);

  const applyFilters = () => {
    let result = {};
    categories.forEach(({ key }) => {
      let filtered = data.filter(item => item.process === key);
      const search = searchStates[key] || '';
      const { startDate, endDate } = dateFilters[key] || {};

      if (search) {
        filtered = filtered.filter(item => item.content.toLowerCase().includes(search.toLowerCase()));
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
      result[key] = filtered;
    });
    setFilteredData(result);
  };

  const renderExtraColumn = (item) => {
    const processMapping = {
      imp1: '개선필요',
      imp2: '개선',
      imp3: '테스트',
      imp4: '완료'
    };
    return processMapping[item.process] || '알 수 없음';
  };

  const handleSearchClick = (key) => {
    applyFilters(); // 검색 버튼 클릭 시 필터링 적용
  };
  
  const handleSearchChange = (key, value) => {
    setSearchStates(prev => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (key, field, value) => {
    setDateFilters(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const getCardTitleStyle = (key) => {
    switch (key) {
      case 'imp1':
        return { backgroundColor: 'red', color: 'white' }; // 개선필요 -> 빨강
      case 'imp2':
        return { backgroundColor: 'orange', color: 'white' }; // 개선 -> 주황
      case 'imp3':
        return { backgroundColor: 'yellow', color: 'black' }; // 테스트 -> 노랑
      case 'imp4':
        return { backgroundColor: 'green', color: 'white' }; // 완료 -> 초록
      default:
        return {};
    }
  };

  return (
    <div style={{ padding: '20px', display: 'grid', gap: '20px' }}>
      {categories.map(({ key, label }) => (
        <Card key={key} style={{ borderColor: getCardTitleStyle(key).backgroundColor, borderWidth: '2px' }}>  
          <CardBody>
            {/* 카드 제목 부분 배경색 적용 */}
            <h3 style={getCardTitleStyle(key)}>{label}</h3>

            {/* 날짜 필터 */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Button onClick={() => { setDateSort(dateSort === 'asc' ? 'desc' : 'asc'); applyFilters(); }}>
                날짜 정렬: {dateSort === 'asc' ? '오름차순' : '내림차순'}
              </Button>
            </div>

            {/* 날짜 선택 필터 (시작날짜, 끝날짜) */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <DatePicker
                selected={dateFilters[key]?.startDate || null}
                onChange={date => handleDateChange(key, 'startDate', date)}
                placeholderText="시작 날짜 선택"
                showMonthYearPicker
                dateFormat="yyyy-MM"
              />
              <DatePicker
                selected={dateFilters[key]?.endDate || null}
                onChange={date => handleDateChange(key, 'endDate', date)}
                placeholderText="끝 날짜 선택"
                showMonthYearPicker
                dateFormat="yyyy-MM"
              />
              <Button onClick={() => setDateFilters(prev => ({ ...prev, [key]: {} }))} color="secondary">
                전체 날짜 보기
              </Button>
            </div>

            {/* 키워드 검색 */}
            <div style={{ width: '100%' }}>
              <SearchBar 
                search={searchStates[key] || ''} 
                onSearchChange={(e) => handleSearchChange(key, e.target.value)}
                onSearchClick={() => handleSearchClick(key)} // 버튼 클릭 시 필터링
              />
            </div>

            {/* CommonList 추가 */}
            <CommonList
              data={filteredData[key] || []}
              searchData={searchStates[key] || ''}
              renderExtraColumn={renderExtraColumn}
            />
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Improvement;
