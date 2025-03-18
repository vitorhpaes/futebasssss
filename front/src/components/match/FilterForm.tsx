import React from 'react';
import { FiFilter, FiX, FiSearch, FiMapPin } from 'react-icons/fi';
import Select from '../../components/form/Select';
import * as S from '../../pages/admin/MatchManagePage.styles';
import { FormikProps } from 'formik';
import { Position } from '@futebass-ia/constants';

export interface FilterParams {
  name: string;
  position: Position | '';
}

export interface FilterFormProps {
  formik: FormikProps<FilterParams>;
  positionOptions: Array<{ value: string; label: string }>;
  onClear: () => void;
  closeFilter: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  formik,
  positionOptions,
  onClear,
  closeFilter
}) => (
  <S.MatchInfo style={{ marginBottom: '8px' }}>
    <S.MatchHeader>
      <S.MatchTitle style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FiFilter size={16} />
        Filtros
      </S.MatchTitle>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <S.ConfirmButton
          onClick={onClear}
          style={{ background: 'transparent', color: '#666' }}
        >
          <FiX size={14} />
          Limpar
        </S.ConfirmButton>
        
        <S.ConfirmButton
          onClick={closeFilter}
          style={{ background: 'transparent', color: '#666' }}
        >
          <FiX size={14} />
          Fechar
        </S.ConfirmButton>
      </div>
    </S.MatchHeader>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '16px' }}>
      <div>
        <label htmlFor="name" style={{ fontSize: '14px', marginBottom: '4px', display: 'block', color: '#666' }}>
          <FiSearch size={14} style={{ marginRight: '4px' }} />
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px'
          }}
          placeholder="Buscar por nome"
        />
      </div>
      
      <div>
        <label htmlFor="position" style={{ fontSize: '14px', marginBottom: '4px', display: 'block', color: '#666' }}>
          <FiMapPin size={14} style={{ marginRight: '4px' }} />
          Posição
        </label>
        <Select
          name="position"
          options={positionOptions}
          value={formik.values.position}
          onValueChange={(value) => formik.setFieldValue('position', value)}
          placeholder="Todas"
        />
      </div>
    </div>
  </S.MatchInfo>
);

export default FilterForm; 