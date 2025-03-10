import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const FormSection = styled.div`
  margin-bottom: 24px;
`;

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
`;

export const FormColumn = styled.div`
  flex: 1;
  min-width: 250px;
  padding: 10px;

  > div {
    margin-bottom: 20px;
  }
`;

export const FormLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const FormInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light}30;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.hint};
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  transition: border-color 0.2s;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light}30;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.hint};
  }
`;

export const FormHelperText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.hint};
  margin-top: 4px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
`;

export const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral.light};
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.neutral.light};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.default};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.neutral.light};
    cursor: not-allowed;
  }
`;

export const AlertSuccess = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.light}20;
  color: ${({ theme }) => theme.colors.primary.dark};
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 24px;
`;

export const AlertError = styled.div`
  background-color: ${({ theme }) => theme.colors.error.light}20;
  color: ${({ theme }) => theme.colors.error.dark};
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 24px;
`;

export const LoadingSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  display: inline-block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`; 