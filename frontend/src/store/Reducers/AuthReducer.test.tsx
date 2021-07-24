import { AuthReducer, initState } from "./AuthReducer";



describe('auth reducer', () => {

    it('should return the initial state', () => {
        
      expect(AuthReducer(initState, {})).toEqual({loginResponse:""});

    });

});