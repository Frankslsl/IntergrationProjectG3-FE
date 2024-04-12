// TabContext.tsx 或对应的文件
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CourseInfo {
  courseId: number | null;
  courseName: string | null;
}

interface TabContextType {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
  courseInfo: CourseInfo; // 添加课程信息的状态
  setCourseInfo: (info: CourseInfo) => void; // 方法来更新课程信息
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTab = () => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};

export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('register-courses');
  const [courseInfo, setCourseInfo] = useState<CourseInfo>({ courseId: null, courseName: null });

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, courseInfo, setCourseInfo }}>
      {children}
    </TabContext.Provider>
  );
};
