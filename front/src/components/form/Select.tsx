import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { styled } from 'styled-components';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

// Valor especial para representar "sem seleção" ou "opção padrão"
export const EMPTY_VALUE = '___empty___';

// Componentes estilizados
const StyledTrigger = styled(SelectPrimitive.Trigger)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 0 15px;
  font-size: 14px;
  line-height: 1;
  height: 35px;
  gap: 5px;
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  width: 100%;
  box-sizing: border-box;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
  }
  
  &[data-placeholder] {
    color: ${({ theme }) => theme.colors.text.hint};
  }
  
  &[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledIcon = styled(SelectPrimitive.Icon)`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StyledContent = styled(SelectPrimitive.Content)`
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 1000;
`;

const StyledViewport = styled(SelectPrimitive.Viewport)`
  padding: 5px;
`;

const StyledItem = styled(SelectPrimitive.Item)`
  all: unset;
  font-size: 14px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;
  
  &[data-disabled] {
    color: ${({ theme }) => theme.colors.text.hint};
    pointer-events: none;
  }
  
  &[data-highlighted] {
    background-color: ${({ theme }) => theme.colors.primary.light};
    color: white;
  }
`;

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.main};
`;

const StyledScrollButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: default;
`;

// Exportando os componentes com um alias
const Root = SelectPrimitive.Root;
const Trigger = StyledTrigger;
const Value = SelectPrimitive.Value;
const Icon = StyledIcon;
const Portal = SelectPrimitive.Portal;
const Content = StyledContent;
const Viewport = StyledViewport;
const Item = StyledItem;
const ItemText = SelectPrimitive.ItemText;
const ItemIndicator = StyledItemIndicator;
const ScrollUpButton = styled(SelectPrimitive.ScrollUpButton)`
  ${StyledScrollButton}
`;
const ScrollDownButton = styled(SelectPrimitive.ScrollDownButton)`
  ${StyledScrollButton}
`;

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectPrimitive.SelectProps {
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  name?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, placeholder, value, onValueChange, ...props }, forwardedRef) => {
    // Processar as opções para substituir valores vazios pelo valor especial
    const processedOptions = options.map(option => ({
      ...option,
      value: option.value === '' ? EMPTY_VALUE : option.value
    }));

    // Processar o value para substituir o valor vazio pelo valor especial
    const processedValue = value === '' ? EMPTY_VALUE : value;

    // Handler personalizado para converter o valor especial de volta para string vazia
    const handleValueChange = (newValue: string) => {
      if (onValueChange) {
        onValueChange(newValue === EMPTY_VALUE ? '' : newValue);
      }
    };

    return (
      <Root {...props} value={processedValue} onValueChange={handleValueChange}>
        <Trigger ref={forwardedRef} aria-required={props.required}>
          <Value placeholder={placeholder || 'Selecione uma opção'} />
          <Icon>
            <ChevronDownIcon />
          </Icon>
        </Trigger>
        <Portal>
          <Content position="popper" sideOffset={5}>
            <ScrollUpButton>
              <ChevronUpIcon />
            </ScrollUpButton>
            <Viewport>
              {processedOptions.map((option) => (
                <Item key={option.value} value={option.value} disabled={option.disabled}>
                  <ItemText>{option.label}</ItemText>
                  <ItemIndicator>
                    <CheckIcon />
                  </ItemIndicator>
                </Item>
              ))}
            </Viewport>
            <ScrollDownButton>
              <ChevronDownIcon />
            </ScrollDownButton>
          </Content>
        </Portal>
      </Root>
    );
  }
);

Select.displayName = 'Select';

export default Select; 