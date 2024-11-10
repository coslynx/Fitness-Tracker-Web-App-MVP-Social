import moment from 'moment';

export const formatDate = (date: Date, format: string): string => {
  return moment(date).format(format);
};

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidDate = (date: string, format: string): boolean => {
  return moment(date, format).isValid();
};

export const calculateProgressPercentage = (goal: Goal): number => {
  const percentage = (goal.currentValue / goal.targetValue) * 100;
  return percentage;
};

export const parseDate = (dateString: string): Date | null => {
  const date = moment(dateString, 'YYYY-MM-DD').toDate();
  return date ? date : null;
};