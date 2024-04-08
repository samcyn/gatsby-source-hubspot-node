import React from 'react';
import AppCard from '.';

type Props = {
  readonly id?: string;
  readonly properties: {
    readonly firstname: string;
    readonly email: string;
    readonly lastname: string;
    readonly hs_object_id: string;
  };
};
const AppCardWithContact = ({ properties: { firstname, lastname, email, hs_object_id } }: Props) => {
  return (
    <AppCard>
      <div className="p-4 md:p-6">
        <p className="font-bold text-lg mb-2 text-primary">Hubspot CMS Contact</p>
        <p className="text-primary">
          {firstname || 'John'} {lastname || 'Doe'}
        </p>
        <p className="text-primary">{email}</p>
        <small className="text-primary opacity-40">#{hs_object_id}</small>
      </div>
    </AppCard>
  );
};

export default AppCardWithContact;
