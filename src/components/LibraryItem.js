import React from 'react';
import styled from 'styled-components';
import { FiTrash2 } from 'react-icons/fi'; // آیکون سطل زباله

const LibraryItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;

  &:hover {
    background-color: #282828;
  }

  img {
    width: 48px;
    height: 48px;
    margin-right: 16px;
    background-color: #282828;
  }

  .item-info {
    color: #b3b3b3;
    
    .item-name {
      color: white;
      font-size: 14px;
      font-weight: 600;
      margin: 0;
    }
    
    .item-type {
      font-size: 12px;
    }
  }
`;

// استایل برای دکمه حذف
const DeleteButton = styled.div`
  position: absolute;
  right: 16px;
  color: #b3b3b3;
  cursor: pointer;
  opacity: 0; // به طور پیش‌فرض مخفی است
  transition: opacity 0.2s ease;

  &:hover {
    color: #fff;
  }
`;

// با هاور روی آیتم، دکمه حذف نمایش داده می‌شود
const LibraryItemContainerWithHover = styled(LibraryItemContainer)`
  &:hover ${DeleteButton} {
    opacity: 1;
  }
`;

function LibraryItem({ image, name, type, onDelete }) {
  return (
    <LibraryItemContainerWithHover>
      <img src={image} alt={name} />
      <div className="item-info">
        <p className="item-name">{name}</p>
        <p className="item-type">{type}</p>
      </div>
      {/* فقط اگر نوع پلی‌لیست بود و تابع حذف وجود داشت، دکمه را نمایش بده */}
      {type === 'Playlist' && onDelete && (
        <DeleteButton onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          <FiTrash2 size={18} />
        </DeleteButton>
      )}
    </LibraryItemContainerWithHover>
  );
}

export default LibraryItem;