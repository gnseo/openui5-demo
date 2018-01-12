# Implementing oData Service by SEGW(transaction code) in SAP GUI

## Class ZCL_ZODOA_TEST_DPC_EXT
> ZODOA_TEST is name of project

### Redefine Method `CSNSET_GET_ENTITY`
> CSNSET is name of entityset
```abap
method CSNSET_GET_ENTITY.
  DATA: ls_key TYPE zoa_s_csn_key_test.
  LOOP AT it_key_tab INTO DATA(ls_input_key).
    CASE ls_input_key-name.
      WHEN 'Vkorg'.
        ls_key-vkorg = ls_input_key-value.
      WHEN 'Onum'.
        ls_key-onum = ls_input_key-value.
      WHEN OTHERS.
    ENDCASE.
  ENDLOOP.
  SELECT SINGLE * FROM zoa_t_csn_test
      INTO CORRESPONDING FIELDS OF ER_ENTITY
        WHERE vkorg = ls_key-vkorg
          AND onum = ls_key-onum
    .

endmethod.
```
### Redefine Method `CSNSET_GET_ENTITYSET`
> CSNSET is name of entityset
```abap
METHOD csnset_get_entityset.
  DATA: lv_where TYPE string.

  lv_where = io_tech_request_context->get_osql_where_clause_convert( ).

  SELECT * FROM zoa_t_csn_test
      INTO CORRESPONDING FIELDS OF TABLE et_entityset
      WHERE (lv_where)
    .
ENDMETHOD.
```
### Redefine Method `CSNSET_UPDATE_ENTITY`
> CSNSET is name of entityset
```abap
METHOD csnset_update_entity.
  DATA: ls_entry TYPE zcl_zodoa_test_mpc=>ts_csn.
  io_data_provider->read_entry_data( IMPORTING es_data = ls_entry ).

  DATA: ls_key TYPE zoa_s_csn_key_test.
  LOOP AT it_key_tab INTO DATA(ls_input_key).
    CASE ls_input_key-name.
      WHEN 'Vkorg'.
        ls_key-vkorg = ls_input_key-value.
      WHEN 'Onum'.
        ls_key-onum = ls_input_key-value.
      WHEN OTHERS.
    ENDCASE.
  ENDLOOP.

*    UPDATE zoa_t_csn_test SET zoabh = ls_entry-zoabh
*                        WHERE vkorg = ls_key-vkorg
*                          AND onum = ls_key-onum.
  DATA: ls_csn TYPE zoa_t_csn_test.

  MOVE-CORRESPONDING ls_entry TO ls_csn.

  UPDATE zoa_t_csn_test FROM ls_csn.
  IF sy-subrc = 0.
    /iwbep/if_mgw_conv_srv_runtime~set_header(
        EXPORTING
          is_header = VALUE #( name = 'succeed' value = 'true' )
    ).
  ELSE.
    /iwbep/if_mgw_conv_srv_runtime~set_header(
        EXPORTING
          is_header = VALUE #( name = 'succeed' value = 'false' )
    ).
  ENDIF.

  er_entity = ls_entry.
ENDMETHOD.
```
### Redefine Method `CSNSET_CREATE_ENTITY`
> CSNSET is name of entityset
```abap
METHOD csnset_create_entity.
  DATA: ls_entry TYPE zcl_zodoa_test_mpc=>ts_csn.
  io_data_provider->read_entry_data( IMPORTING es_data = ls_entry ).

  DATA: ls_csn TYPE zoa_t_csn_test.

  MOVE-CORRESPONDING ls_entry TO ls_csn.

  ls_csn-zoabh = sy-uzeit.

  DATA: lo_mc TYPE REF TO /iwbep/if_message_container.
  lo_mc = mo_context->get_message_container( ).

  INSERT zoa_t_csn_test FROM ls_csn.
  IF sy-subrc = 0.
    MOVE-CORRESPONDING ls_csn TO ls_entry.

    lo_mc->add_message_text_only(
      EXPORTING
        iv_msg_type = 'S'
        iv_msg_text = 'Succeed to insert'
        iv_add_to_response_header = abap_true
    ).
  ELSE.
    lo_mc->add_message_text_only(
      EXPORTING
        iv_msg_type = 'E'
        iv_msg_text = 'Failed to insert'
        iv_add_to_response_header = abap_true
    ).
  ENDIF.

  er_entity = ls_entry.
ENDMETHOD.
```
### Redefine Method `CSNSET_DELETE_ENTITY`
> CSNSET is name of entityset
```abap
METHOD csnset_delete_entity.
  DATA: ls_key TYPE zoa_s_csn_key_test.
  LOOP AT it_key_tab INTO DATA(ls_input_key).
    CASE ls_input_key-name.
      WHEN 'Vkorg'.
        ls_key-vkorg = ls_input_key-value.
      WHEN 'Onum'.
        ls_key-onum = ls_input_key-value.
      WHEN OTHERS.
    ENDCASE.
  ENDLOOP.

  DATA: lo_mc TYPE REF TO /iwbep/if_message_container.
  lo_mc = mo_context->get_message_container( ).

  DELETE FROM zoa_t_csn_test WHERE vkorg = ls_key-vkorg
            AND onum = ls_key-onum.
  IF sy-subrc = 0.
    lo_mc->add_message_text_only(
      EXPORTING
        iv_msg_type = 'S'
        iv_msg_text = 'Succeed to delete'
        iv_add_to_response_header = abap_true
    ).
  ELSE.
    lo_mc->add_message_text_only(
      EXPORTING
        iv_msg_type = 'E'
        iv_msg_text = 'Failed to delete'
        iv_add_to_response_header = abap_true
    ).
  ENDIF.
ENDMETHOD.
```
