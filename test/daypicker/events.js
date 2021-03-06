import React from 'react';
import SyntheticEvent from 'react-dom/lib/SyntheticEvent';

import { mount } from 'enzyme';

import DayPicker from '../../src/DayPicker';
import keys from '../../src/keys';
import { formatMonthTitle } from '../../src/LocaleUtils';

describe('DayPicker’s events handlers', () => {
  it('should call the `onCaptionClick` handler', () => {
    const handleCaptionClick = jest.fn();
    const wrapper = mount(<DayPicker onCaptionClick={handleCaptionClick} />);
    wrapper.find('.DayPicker-Caption').childAt(0).simulate('click');

    expect(handleCaptionClick.mock.calls[0][0].getFullYear()).toEqual(
      new Date().getFullYear()
    );
    expect(handleCaptionClick.mock.calls[0][0].getMonth()).toEqual(
      new Date().getMonth()
    );
    expect(handleCaptionClick.mock.calls[0][1]).toBeInstanceOf(SyntheticEvent);
  });
  it('should call the `onDayClick` event handler', () => {
    const handleDayClick = jest.fn();

    const modifiers = { foo: d => d.getDate() === 15 };
    const wrapper = mount(
      <DayPicker modifiers={modifiers} onDayClick={handleDayClick} />
    );

    wrapper.find('.DayPicker-Day--foo').simulate('click');

    const arg0 = handleDayClick.mock.calls[0][0];
    const arg1 = handleDayClick.mock.calls[0][1];
    const arg2 = handleDayClick.mock.calls[0][2];
    expect(arg0.getFullYear()).toEqual(new Date().getFullYear());
    expect(arg0.getMonth()).toEqual(new Date().getMonth());
    expect(arg1).toEqual({ foo: true });
    expect(arg2).toBeInstanceOf(SyntheticEvent);
  });

  it('should call the `onDayKeyDown` event handler', () => {
    const handleDayKeyDown = jest.fn();

    const modifiers = { foo: d => d.getDate() === 15 };
    const wrapper = mount(
      <DayPicker modifiers={modifiers} onDayKeyDown={handleDayKeyDown} />
    );

    wrapper.find('.DayPicker-Day--foo').simulate('keyDown');

    const arg0 = handleDayKeyDown.mock.calls[0][0];
    const arg1 = handleDayKeyDown.mock.calls[0][1];
    const arg2 = handleDayKeyDown.mock.calls[0][2];
    expect(arg0.getFullYear()).toEqual(new Date().getFullYear());
    expect(arg0.getMonth()).toEqual(new Date().getMonth());
    expect(arg1).toEqual({ foo: true });
    expect(arg2).toBeInstanceOf(SyntheticEvent);
  });
  it('should call the `onDayMouseEnter` event handler', () => {
    const handleDayMouseEnter = jest.fn();

    const modifiers = { foo: d => d.getDate() === 15 };
    const wrapper = mount(
      <DayPicker modifiers={modifiers} onDayMouseEnter={handleDayMouseEnter} />
    );

    wrapper.find('.DayPicker-Day--foo').simulate('mouseEnter');

    const arg0 = handleDayMouseEnter.mock.calls[0][0];
    const arg1 = handleDayMouseEnter.mock.calls[0][1];
    const arg2 = handleDayMouseEnter.mock.calls[0][2];
    expect(arg0.getFullYear()).toEqual(new Date().getFullYear());
    expect(arg0.getMonth()).toEqual(new Date().getMonth());
    expect(arg1).toEqual({ foo: true });
    expect(arg2).toBeInstanceOf(SyntheticEvent);
  });
  it('should call the `onDayMouseLeave` event handler', () => {
    const handleDayMouseLeave = jest.fn();

    const modifiers = { foo: d => d.getDate() === 15 };
    const wrapper = mount(
      <DayPicker modifiers={modifiers} onDayMouseLeave={handleDayMouseLeave} />
    );

    wrapper.find('.DayPicker-Day--foo').simulate('mouseLeave');

    const arg0 = handleDayMouseLeave.mock.calls[0][0];
    const arg1 = handleDayMouseLeave.mock.calls[0][1];
    const arg2 = handleDayMouseLeave.mock.calls[0][2];
    expect(arg0.getFullYear()).toEqual(new Date().getFullYear());
    expect(arg0.getMonth()).toEqual(new Date().getMonth());
    expect(arg1).toEqual({ foo: true });
    expect(arg2).toBeInstanceOf(SyntheticEvent);
  });
  it('should call the `onDayTouchStart` event handler', () => {
    const handleDayTouchStart = jest.fn();

    const modifiers = { foo: d => d.getDate() === 15 };
    const wrapper = mount(
      <DayPicker modifiers={modifiers} onDayTouchStart={handleDayTouchStart} />
    );

    wrapper.find('.DayPicker-Day--foo').simulate('touchStart');

    const arg0 = handleDayTouchStart.mock.calls[0][0];
    const arg1 = handleDayTouchStart.mock.calls[0][1];
    const arg2 = handleDayTouchStart.mock.calls[0][2];
    expect(arg0.getFullYear()).toEqual(new Date().getFullYear());
    expect(arg0.getMonth()).toEqual(new Date().getMonth());
    expect(arg1).toEqual({ foo: true });
    expect(arg2).toBeInstanceOf(SyntheticEvent);
  });
  it('should call the `onDayTouchEnd` event handler', () => {
    const handleDayTouchEnd = jest.fn();

    const modifiers = { foo: d => d.getDate() === 15 };
    const wrapper = mount(
      <DayPicker modifiers={modifiers} onDayTouchEnd={handleDayTouchEnd} />
    );

    wrapper.find('.DayPicker-Day--foo').simulate('touchEnd');

    const arg0 = handleDayTouchEnd.mock.calls[0][0];
    const arg1 = handleDayTouchEnd.mock.calls[0][1];
    const arg2 = handleDayTouchEnd.mock.calls[0][2];
    expect(arg0.getFullYear()).toEqual(new Date().getFullYear());
    expect(arg0.getMonth()).toEqual(new Date().getMonth());
    expect(arg1).toEqual({ foo: true });
    expect(arg2).toBeInstanceOf(SyntheticEvent);
  });

  it("should not call the day's cell event handlers for outside days", () => {
    const handleDayClick = jest.fn();
    const handleDayMouseEnter = jest.fn();
    const handleDayMouseLeave = jest.fn();
    const wrapper = mount(
      <DayPicker
        initialMonth={new Date(2015, 11, 5)}
        onDayClick={handleDayClick}
        onDayMouseEnter={handleDayMouseEnter}
        onDayMouseLeave={handleDayMouseLeave}
      />
    );

    wrapper.find('.DayPicker-Day--outside').at(0).simulate('click');
    expect(handleDayClick).not.toHaveBeenCalled();

    wrapper.find('.DayPicker-Day--outside').at(0).simulate('mouseEnter');
    expect(handleDayMouseEnter).not.toHaveBeenCalled();

    wrapper.find('.DayPicker-Day--outside').at(0).simulate('mouseLeave');
    expect(handleDayMouseLeave).not.toHaveBeenCalled();
  });
  it('should call `onDayClick` event handler when pressing the ENTER key', () => {
    const handleDayClick = jest.fn();
    const modifiers = { foo: d => d.getDate() === 15, bar: () => false };
    const wrapper = mount(
      <DayPicker modifiers={modifiers} onDayClick={handleDayClick} />
    );
    wrapper
      .find('.DayPicker-Day--foo')
      .simulate('keyDown', { keyCode: keys.ENTER });
    const arg0 = handleDayClick.mock.calls[0][0];
    const arg1 = handleDayClick.mock.calls[0][1];
    const arg2 = handleDayClick.mock.calls[0][2];
    expect(arg0.getFullYear()).toEqual(new Date().getFullYear());
    expect(arg0.getMonth()).toEqual(new Date().getMonth());
    expect(arg1).toEqual({ foo: true });
    expect(arg2).toBeInstanceOf(SyntheticEvent);
  });
  it('should not call an undefined `onDayClick` event handler when pressing the ENTER key', () => {
    const handleDayClick = jest.fn();
    const modifiers = { foo: d => d.getDate() === 15, bar: () => false };
    const wrapper = mount(<DayPicker modifiers={modifiers} />);
    wrapper
      .find('.DayPicker-Day--foo')
      .simulate('keyDown', { keyCode: keys.ENTER });
    expect(handleDayClick).not.toHaveBeenCalled();
  });
  it('should call `onDayClick` event handler when pressing the SPACE key', () => {
    const handleDayClick = jest.fn();
    const modifiers = { foo: d => d.getDate() === 15 };
    const wrapper = mount(
      <DayPicker modifiers={modifiers} onDayClick={handleDayClick} />
    );
    wrapper
      .find('.DayPicker-Day--foo')
      .simulate('keyDown', { keyCode: keys.SPACE });
    const arg0 = handleDayClick.mock.calls[0][0];
    const arg1 = handleDayClick.mock.calls[0][1];
    const arg2 = handleDayClick.mock.calls[0][2];
    expect(arg0.getFullYear()).toEqual(new Date().getFullYear());
    expect(arg0.getMonth()).toEqual(new Date().getMonth());
    expect(arg1).toEqual({ foo: true });
    expect(arg2).toBeInstanceOf(SyntheticEvent);
  });
  it('should call `onKeyDown` event handler', () => {
    const handleKeyDown = jest.fn();
    const wrapper = mount(<DayPicker onKeyDown={handleKeyDown} />);
    wrapper.find('.DayPicker-wrapper').simulate('keyDown');
    expect(handleKeyDown.mock.calls[0][0]).toBeInstanceOf(SyntheticEvent);
  });
  it('should call `onKeyDown` also when changing month is disabled', () => {
    const handleKeyDown = jest.fn();
    const wrapper = mount(
      <DayPicker onKeyDown={handleKeyDown} canChangeMonth={false} />
    );
    wrapper.find('.DayPicker-wrapper').simulate('keyDown');
    expect(handleKeyDown.mock.calls[0][0]).toBeInstanceOf(SyntheticEvent);
  });
  it('should display the current month when clicking the today button', () => {
    const wrapper = mount(
      <DayPicker todayButton="foo" initialMonth={new Date(2015, 1)} />
    );
    wrapper.find('button.DayPicker-TodayButton').simulate('click');
    expect(wrapper.find('.DayPicker-Footer')).toBeDefined();
    expect(wrapper.find('.DayPicker-Caption')).toHaveText(
      formatMonthTitle(new Date())
    );
  });
  it('should call `onWeekClick` when clicking on a week number', () => {
    const handleWeekClick = jest.fn();
    const wrapper = mount(
      <DayPicker
        showWeekNumbers
        onWeekClick={handleWeekClick}
        initialMonth={new Date(2015, 1)}
      />
    );
    wrapper.find('.DayPicker-WeekNumber').at(1).simulate('click');
    expect(handleWeekClick.mock.calls[0][0]).toBe(6);
    expect(handleWeekClick.mock.calls[0][1]).toHaveLength(7);
  });
});
