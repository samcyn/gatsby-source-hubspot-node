import * as React from 'react';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const AppInput = ({ className, ...rest }: Props) => {
  return (
    <div className="relative">
      <div className="absolute text-primary h-full top-0 left-0 bottom-0 w-10 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <title>Stockholm-icons / General / Search</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect x="0" y="0" width="24" height="24"></rect>
            <path
              d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
              fill="currentColor"
              fillRule="nonzero"
            ></path>
            <path
              d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
              fill="currentColor"
              fillRule="nonzero"
            ></path>
          </g>
        </svg>
      </div>
      <input
        {...rest}
        className={`
        w-full block outline-none 
        px-4 py-2 text-sm
        bg-brand-gray text-primary 
        border-brand-gray 
        bg-clip-padding rounded 
        focus:bg-brand-dgray
        focus:border-brand-dgray
        pl-10
        ${className || ''}`}
      />
    </div>
  );
};

export default AppInput;
