import type { CollectionEntry } from 'astro:content';

import { SITE } from '@/config';

export default (post: CollectionEntry<'blog'>) => {
  return (
    <div
      style={{
        background: '#fefbfb',
        width: '100%',
        height: '100%',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-1px',
          right: '-1px',
          border: '4px solid #000',
          background: '#ecebeb',
          opacity: '0.9',
          'border-radius': '4px',
          display: 'flex',
          'justify-content': 'center',
          margin: '2.5rem',
          width: '88%',
          height: '80%',
        }}
      />

      <div
        style={{
          border: '4px solid #000',
          background: '#fefbfb',
          'border-radius': '4px',
          display: 'flex',
          'justify-content': 'center',
          margin: '2rem',
          width: '88%',
          height: '80%',
        }}
      >
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            'justify-content': 'space-between',
            margin: '20px',
            width: '90%',
            height: '90%',
          }}
        >
          <p
            style={{
              'font-size': '72px',
              'font-weight': 'bold',
              'max-height': '84%',
              overflow: 'hidden',
            }}
          >
            {post.data.title}
          </p>
          <div
            style={{
              display: 'flex',
              'justify-content': 'space-between',
              width: '100%',
              'margin-bottom': '8px',
              'font-size': '28px',
            }}
          >
            <span>
              by{' '}
              <span
                style={{
                  color: 'transparent',
                }}
              >
                "
              </span>
              <span style={{ overflow: 'hidden', 'font-weight': 'bold' }}>{SITE.author}</span>
            </span>

            <span style={{ overflow: 'hidden', 'font-weight': 'bold' }}>{SITE.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
