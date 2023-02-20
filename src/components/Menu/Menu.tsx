/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';

import { Dialog, Pane, Table } from 'evergreen-ui';

import warehouseImg from 'assets/images/warehouse.png';
import Button from 'components/Button/Button.lazy';
import MerchantsBar from 'components/MerchantsBar/MerchantsBar.lazy';
import Navbar from 'components/Navbar/Navbar.lazy';
import SideBar from 'components/SideBar/SideBar.lazy';
import CSSVARIABLES from 'global/constants/variables';

import { AddItemModalWrapper, ItemCardWrapper, MenuWrapper, StoreDetailsWrapper } from './Menu.styles';

// declare interface IMenuProps {}

const Menu: React.FC = () => (
  <MenuWrapper data-testid="Menu">
    <SideBar lightColor={CSSVARIABLES.COLORS.BLUE_1} darkColor={CSSVARIABLES.COLORS.BLUE_0} />
    <MerchantsBar />
    <div className="content">
      <Navbar />
      <StoreDetails />
    </div>
  </MenuWrapper>
);

const StoreDetails: React.FC = () => {
  const [ShowAddStoreForm, setShowAddStoreForm] = useState<boolean>(false);
  const [ShowMenus, setShowMenus] = useState<boolean>(false);
  const [NumberOfItems, setNumberOfItems] = useState<number>(1);

  return (
    <StoreDetailsWrapper>
      <div className="owner-name">
        {/* <img
          className="profile-img"
          src="https://ph-avatars.imgix.net/2429667/b98d457a-ff12-4ffd-a85a-c7da09f645ec?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=170&h=170&fit=crop&dpr=2"
          alt="profile"
        /> */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">Happy Meal Menu</a>
      </div>
      {ShowMenus ? (
        <>
          <ItemCard NumberOfItems={NumberOfItems} />
          <Button text="Add Item" backgroundColor={CSSVARIABLES.COLORS.BLUE_2} onClick={() => setNumberOfItems(NumberOfItems + 1)} />
        </>
      ) : (
        <div className="no-store">
          <img className="profile-img" src={warehouseImg} alt="shop" />
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <h1>No items Added</h1>
            <p>Add the first item in this menu by clicking on “Add item” below.</p>
            <Button text="Add Item" backgroundColor={CSSVARIABLES.COLORS.BLUE_0} onClick={() => setShowAddStoreForm(true)} />
          </div>
        </div>
      )}
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
      <AddItemModal isShown={ShowAddStoreForm} setIsShown={setShowAddStoreForm} setShowMenus={setShowMenus} />
    </StoreDetailsWrapper>
  );
};

interface AddItemModalProps {
  isShown: boolean;
  setIsShown: (value: React.SetStateAction<boolean>) => void;
  setShowMenus: (value: React.SetStateAction<boolean>) => void;
}
const AddItemModal: React.FC<AddItemModalProps> = ({ isShown, setIsShown, setShowMenus }: AddItemModalProps) => {
  // const [ShowLocateModal, setShowLocateModal] = useState<boolean>(false);

  return (
    <Pane>
      <Dialog width="fit-content" isShown={isShown} title="Add New Item" onCloseComplete={() => setIsShown(false)} hasFooter={false}>
        <AddItemModalWrapper>
          <div className="col">
            <div className="input-container">
              <div className="input-label">ITEM NAME</div>
              <div className="input-row">
                <span>
                  <input className="input-field" type="text" placeholder="Type Name here" />
                </span>
              </div>
            </div>
            <div className="input-container">
              <div className="input-label">SELECT A CATEGORY</div>
              <div className="input-row">
                <span>
                  <input className="input-field" type="text" placeholder="Select Category" />
                </span>
              </div>
            </div>
            <div className="input-container">
              <div className="input-label">ENTER A PRICE</div>
              <div className="input-row">
                <span>USD</span>
                <span>
                  <input className="input-field" type="number" placeholder="Enter a Price" />
                </span>
              </div>
            </div>
            <div className="input-container">
              <div className="input-label">CREATE USERNAME</div>
              <div className="input-row">
                <span>
                  <input className="input-field" type="text" placeholder="Create Username" />
                </span>
              </div>
            </div>
            <div className="input-container">
              <div className="input-label">PREPARATION TIME</div>
              <div className="input-row">
                <span>
                  <input className="input-field" type="text" placeholder="HH:MM" />
                </span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="input-container">
              <div className="input-label">WRITE DESCRIPTION</div>
              <div className="input-row">
                <span>
                  <textarea className="input-field" placeholder="Type Description Here" rows={10} />
                </span>
              </div>
            </div>
            {/* <div className="input-container">
              <div className="input-label">UPLOAD ITEM</div>
              <div className="input-row">
                <span onClick={() => setShowLocateModal(true)}>Locate</span>
                <span>
                  <input type="text" className="input-field" placeholder="B street" />
                </span>
              </div>
            </div> */}
          </div>
        </AddItemModalWrapper>
        <Button
          text="Save"
          backgroundColor={CSSVARIABLES.COLORS.BLUE_0}
          onClick={() => {
            setShowMenus(true);
            setIsShown(false);
          }}
        />
      </Dialog>
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
      {/* <LocateModal show={ShowLocateModal} setShow={setShowLocateModal} /> */}
    </Pane>
  );
};

interface ItemCardProps {
  NumberOfItems: number;
}
const ItemCard: React.FC<ItemCardProps> = ({ NumberOfItems }: ItemCardProps) => {
  return (
    <ItemCardWrapper>
      <Table>
        <Table.Head>
          {/* <Table.SearchHeaderCell /> */}
          <Table.TextHeaderCell>Product</Table.TextHeaderCell>
          <Table.TextHeaderCell>Category</Table.TextHeaderCell>
          <Table.TextHeaderCell>Price</Table.TextHeaderCell>
          <Table.TextHeaderCell>Prep Time</Table.TextHeaderCell>
        </Table.Head>
        <Table.VirtualBody height={240}>
          {[...Array(NumberOfItems)].map((e, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Table.Row key={i} isSelectable onSelect={() => alert('Cheese Mac')}>
              <Table.TextCell>Cheese Mac</Table.TextCell>
              <Table.TextCell>Category #1</Table.TextCell>
              <Table.TextCell>$20.89</Table.TextCell>
              <Table.TextCell isNumber>5 mins</Table.TextCell>
            </Table.Row>
          ))}
        </Table.VirtualBody>
      </Table>
    </ItemCardWrapper>
  );
};

export default Menu;
