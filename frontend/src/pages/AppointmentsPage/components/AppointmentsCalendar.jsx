import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const CalendarDay = ({ dateObj, isSelected, onClick }) => {
  const hasAppointment = dateObj.isCurrentMonth && (dateObj.day === 12 || dateObj.day === 15);

  return (
    <div
      onClick={() => dateObj.isCurrentMonth && onClick(dateObj.day)}
      className={`
        relative h-12 flex items-center justify-center text-[0.9rem] font-black rounded-[1rem] transition-all duration-300
        ${!dateObj.isCurrentMonth ? 'text-slate-300 dark:text-slate-600 cursor-default opacity-50' : 'cursor-pointer'}
        ${
          isSelected
            ? 'bg-[#2A7FFF] text-white shadow-[0_10px_20px_rgba(42,127,255,0.4)] scale-110 z-10'
            : dateObj.isCurrentMonth
              ? 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-[#1A2642] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]'
              : ''
        }
      `}
    >
      {dateObj.day}
      {hasAppointment && !isSelected && (
        <div className="absolute bottom-1.5 w-1 h-1 bg-[#2A7FFF] rounded-full" />
      )}
    </div>
  );
};

const AppointmentsCalendar = ({
  monthName,
  prevMonth,
  nextMonth,
  calendarDays,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <div className="xl:col-span-4 flex flex-col gap-8">
      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] p-10 shadow-[16px_16px_32px_#cbced1,-16px_-16px_32px_#ffffff] dark:shadow-[16px_16px_32px_#0a0f1d] border border-white/40">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[1.3rem] font-black text-slate-900 dark:text-white flex items-center gap-3">
            <CalendarIcon size={20} className="text-[#2A7FFF]" />
            {monthName}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="p-3 rounded-xl bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[4px_4px_8px_#cbced1] dark:shadow-none text-slate-400 hover:text-[#2A7FFF] transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextMonth}
              className="p-3 rounded-xl bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[4px_4px_8px_#cbced1] dark:shadow-none text-slate-400 hover:text-[#2A7FFF] transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-3 text-center mb-6">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dayLabel, idx) => (
            <div
              key={idx}
              className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest"
            >
              {dayLabel}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-3 text-center">
          {calendarDays.map((dateObj, i) => (
            <CalendarDay
              key={i}
              dateObj={dateObj}
              isSelected={dateObj.isCurrentMonth && dateObj.day === selectedDate}
              onClick={setSelectedDate}
            />
          ))}
        </div>
      </div>

      <div className="bg-[#ecf0f3] dark:bg-[#1a2235] p-10 rounded-[3rem] shadow-[12px_12px_24px_#cbced1,-12px_-12px_24px_#ffffff] dark:shadow-none border border-white/40">
        <h3 className="text-[1rem] font-black text-slate-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
          <Filter size={18} className="text-[#2A7FFF]" /> Status Filters
        </h3>
        <div className="space-y-4">
          {[
            { label: 'Upcoming Consultations', count: 2 },
            { label: 'Completed Analysis', count: 14 },
            { label: 'Canceled Sessions', count: 0 },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center justify-between p-4 bg-[#ecf0f3] dark:bg-[#0B1121] rounded-2xl shadow-[inset_4px_4px_8px_#cbced1] dark:shadow-none border border-white/10 group cursor-pointer"
            >
              <span className="text-[0.85rem] font-black text-slate-600 dark:text-slate-300">
                {f.label}
              </span>
              <span className="px-3 py-1 bg-white dark:bg-[#1a2235] rounded-lg text-[0.7rem] font-black text-[#2A7FFF] shadow-md">
                {f.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsCalendar;
